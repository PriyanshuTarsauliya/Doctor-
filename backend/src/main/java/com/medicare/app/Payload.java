package com.medicare.app;

import lombok.Data;

public class Payload {
    
    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class SignupRequest {
        private String name;
        private String email;
        private String password;
        private String role; // PATIENT, DOCTOR
    }

    @Data
    public static class JwtResponse {
        private String token;
        private Long id;
        private String email;
        private String name;
        private String role;

        public JwtResponse(String token, Long id, String email, String name, String role) {
            this.token = token;
            this.id = id;
            this.email = email;
            this.name = name;
            this.role = role;
        }
    }

    @Data
    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }
    }
}
