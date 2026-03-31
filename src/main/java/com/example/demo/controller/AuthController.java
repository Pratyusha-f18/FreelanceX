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
        return repo.save(u);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User u) {
        Optional<User> userOpt = repo.findByEmail(u.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (user.getPassword().equals(u.getPassword())) {
                return user;
            }
        }

        return null;
    }
}