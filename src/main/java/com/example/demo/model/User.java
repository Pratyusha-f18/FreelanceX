package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String role; // ADMIN, FREELANCER, CUSTOMER
}