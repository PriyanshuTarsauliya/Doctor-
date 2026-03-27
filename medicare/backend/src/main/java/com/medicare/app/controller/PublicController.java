package com.medicare.app.controller;

import com.medicare.app.model.Doctor;
import com.medicare.app.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    com.medicare.app.repository.UserRepository userRepository;

    @Autowired
    com.medicare.app.repository.AppointmentRepository appointmentRepository;

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorRepository.findAll());
    }

    @GetMapping("/doctors/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/slots")
    public ResponseEntity<List<String>> getAvailableSlots(@RequestParam String date) {
        // Return mock available slots for the given date
        List<String> allSlots = List.of("09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:00 PM");
        int dateHash = java.util.Objects.hash(date);
        java.util.List<String> available = new java.util.ArrayList<>(allSlots);
        if (dateHash % 2 == 0) available.remove("10:00 AM");
        if (dateHash % 3 == 0) available.remove("02:30 PM");
        if (dateHash % 5 == 0) available.remove("08:00 AM");
        return ResponseEntity.ok(available);
    }

    @PostMapping("/book-guest")
    public ResponseEntity<?> bookGuestAppointment(@RequestBody GuestBookingRequest request) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        // Find or create guest user
        com.medicare.app.model.User patient = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    com.medicare.app.model.User newUser = com.medicare.app.model.User.builder()
                            .name(request.getName())
                            .email(request.getEmail())
                            .phone(request.getPhone())
                            .password(org.springframework.security.crypto.bcrypt.BCrypt.hashpw(java.util.UUID.randomUUID().toString(), org.springframework.security.crypto.bcrypt.BCrypt.gensalt())) // random password
                            .role(com.medicare.app.model.Role.ROLE_PATIENT)
                            .build();
                    return userRepository.save(newUser);
                });

        // Parse dateTime or just handle it if it's already an ISO string
        java.time.LocalDateTime dt;
        try {
            // Assume format "2026-03-24 10:00 AM" => parse logic. To avoid complex parsing, 
            // the frontend will just send ISO or we will construct it. 
            // Let's assume the frontend sends ISO 8601 string: 2026-03-24T10:00:00
            dt = java.time.LocalDateTime.parse(request.getDateTime());
        } catch (Exception e) {
            // Fallback if frontend sends bad data
            dt = java.time.LocalDateTime.now().plusDays(1);
        }

        com.medicare.app.model.Appointment appointment = com.medicare.app.model.Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentTime(dt)
                .status("SCHEDULED")
                .type("Guest Consult")
                .notes("Booked via landing page")
                .build();

        appointmentRepository.save(appointment);
        return ResponseEntity.ok(appointment);
    }
}

class GuestBookingRequest {
    private String name;
    private String email;
    private String phone;
    private Long doctorId;
    private String dateTime;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public String getDateTime() { return dateTime; }
    public void setDateTime(String dateTime) { this.dateTime = dateTime; }
}
