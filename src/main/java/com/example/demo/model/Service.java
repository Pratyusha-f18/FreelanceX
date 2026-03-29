package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private double price;

    private String imageUrl;   // NEW ✅
    private double rating;     // NEW ⭐
}