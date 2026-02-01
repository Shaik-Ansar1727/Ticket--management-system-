package com.company.ticketing.ticket_management_system_backend.controller;


import com.company.ticketing.ticket_management_system_backend.dto.AuthResponse;
import com.company.ticketing.ticket_management_system_backend.dto.LoginRequest;
import com.company.ticketing.ticket_management_system_backend.dto.RegisterRequest;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public  AuthController( UserService userService){
        this.userService= userService;
    }




    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request
    ){
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setUsername(request.getUsername());
        user.setDisplayPicture(request.getDisplayPicture());
        user.setBio(request.getBio());

        userService.registerUser(user);

        return ResponseEntity.ok("Registration successful. Await admin approval.");

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        String token = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
