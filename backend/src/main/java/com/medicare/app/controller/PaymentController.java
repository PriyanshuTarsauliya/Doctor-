package com.medicare.app.controller;

import com.medicare.app.model.Appointment;
import com.medicare.app.model.Payment;
import com.medicare.app.repository.AppointmentRepository;
import com.medicare.app.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.key.id:YOUR_KEY_ID}")
    private String keyId;

    @Value("${razorpay.key.secret:YOUR_KEY_SECRET}")
    private String keySecret;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        Long appointmentId = Long.parseLong(data.get("appointmentId").toString());
        Double amount = Double.parseDouble(data.get("amount").toString());

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int)(amount * 100)); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + appointmentId);

        Order order = razorpay.orders.create(orderRequest);

        Payment payment = Payment.builder()
                .appointment(appointment)
                .amount(amount)
                .currency("INR")
                .razorpayOrderId(order.get("id"))
                .status("CREATED")
                .build();
        
        paymentRepository.save(payment);

        return ResponseEntity.ok(order.toString());
    }

    @PostMapping("/verify-webhook")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        String razorpayOrderId = data.get("razorpay_order_id");
        String razorpayPaymentId = data.get("razorpay_payment_id");
        String razorpaySignature = data.get("razorpay_signature");

        Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId);
        if (payment != null) {
            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setRazorpaySignature(razorpaySignature);
            payment.setStatus("SUCCESS");
            
            Appointment appointment = payment.getAppointment();
            appointment.setStatus("CONFIRMED");
            appointmentRepository.save(appointment);
            paymentRepository.save(payment);

            return ResponseEntity.ok("Payment verified successfully");
        }
        return ResponseEntity.badRequest().body("Payment verification failed");
    }
}
