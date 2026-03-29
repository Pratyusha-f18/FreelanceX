package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String serviceName;
    private String status;
    private int rating;
    private String comment;

    // ✅ GETTERS & SETTERS (IMPORTANT)

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }

    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getServiceName() { return serviceName; }

    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public int getRating() { return rating; }

    public void setRating(int rating) { this.rating = rating; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }
}