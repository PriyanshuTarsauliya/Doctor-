package com.medicare.app.controller;

import com.medicare.app.model.Appointment;
import com.medicare.app.model.Doctor;
import com.medicare.app.model.User;
import com.medicare.app.repository.AppointmentRepository;
import com.medicare.app.repository.DoctorRepository;
import com.medicare.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class BookingController {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/my")
    public ResponseEntity<?> getMyAppointments(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getRole().name().equals("ROLE_DOCTOR")) {
            Doctor doctor = doctorRepository.findByUserId(user.getId()).orElseThrow();
            return ResponseEntity.ok(appointmentRepository.findByDoctorId(doctor.getId()));
        } else {
            return ResponseEntity.ok(appointmentRepository.findByPatientId(user.getId()));
        }
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request, Authentication authentication) {
        String email = authentication.getName();
        User patient = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentTime(LocalDateTime.parse(request.getDateTime())) // Keep raw string or format ISO 8601
                .status("SCHEDULED")
                .type(request.getType())
                .notes(request.getNotes())
                .build();

        appointmentRepository.save(appointment);
        return ResponseEntity.ok(appointment);
    }
}

class AppointmentRequest {
    private Long doctorId;
    private String dateTime;
    private String type;
    private String notes;
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public String getDateTime() { return dateTime; }
    public void setDateTime(String dateTime) { this.dateTime = dateTime; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
