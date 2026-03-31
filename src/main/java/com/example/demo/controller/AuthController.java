package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository repo;

    // ✅ REGISTER
    @PostMapping("/register")
public User register(@RequestBody User u) {

    if (u.getRole() == null || u.getRole().isEmpty()) {
        u.setRole("customer"); // default
    }

    if (u.getPassword() == null || u.getPassword().isEmpty()) {
        throw new RuntimeException("Password required ❌");
    }

    return repo.save(u);
}

    // ✅ LOGIN
    @PostMapping("/login")
public User login(@RequestBody User u) {

    Optional<User> userOpt = repo.findByEmail(u.getEmail());

    if (userOpt.isEmpty()) {
        throw new RuntimeException("User not found ❌");
    }

    User user = userOpt.get();

    // 🔒 NULL SAFE PASSWORD CHECK
    if (user.getPassword() == null || u.getPassword() == null) {
        throw new RuntimeException("Password is missing ❌");
    }

    if (!user.getPassword().equals(u.getPassword())) {
        throw new RuntimeException("Invalid password ❌");
    }

    return user;
}
}