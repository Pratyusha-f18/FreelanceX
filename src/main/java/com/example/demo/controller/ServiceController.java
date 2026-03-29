package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.model.Service;
import com.example.demo.repository.ServiceRepository;

@RestController
@RequestMapping("/services")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceRepository repo;

    @GetMapping
    public List<Service> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Service addService(@RequestBody Service s) {
        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
    repo.deleteById(id);
}
}