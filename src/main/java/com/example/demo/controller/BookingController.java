package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;
import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingRepository repo;
 
    @GetMapping
    public List<Booking> getAll() {
        return repo.findAll();
    }

    @GetMapping("/service/{name}")
public List<Booking> getByService(@PathVariable String name) {
    return repo.findByServiceName(name);
}
@PostMapping
public Booking book(@RequestBody Booking b) {
    b.setStatus("PENDING"); // ✅ NOT PAID
    return repo.save(b);
}

@PutMapping("/{id}")
public Booking updateStatus(@PathVariable Long id) {
    Booking b = repo.findById(id).orElse(null);
    if (b != null) {
        b.setStatus("COMPLETED");
        return repo.save(b);
    }
    return null;
}

@PutMapping("/book/{id}/complete")
public Booking complete(@PathVariable Long id) {
    Booking b = repo.findById(id).orElse(null);
    if (b != null) {
        b.setStatus("COMPLETED");
        return repo.save(b);
    }
    return null;
}
}