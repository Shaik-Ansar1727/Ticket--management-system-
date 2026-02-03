package com.company.ticketing.ticket_management_system_backend.controller;

import com.company.ticketing.ticket_management_system_backend.dto.ChangePasswordRequest;
import com.company.ticketing.ticket_management_system_backend.dto.UserResponse;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyProfile() {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userService.getUserById(userId);
        return ResponseEntity.ok(userService.mapToUserResponse(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateMyProfile(
            @RequestBody UserResponse request
    ) {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userService.getUserById(userId);

        user.setUsername(request.getUsername());
        user.setBio(request.getBio());
        user.setDisplayPicture(request.getDisplayPicture());

        User updatedUser = userService.updateUser(user);

        return ResponseEntity.ok(userService.mapToUserResponse(updatedUser));
    }
    @PutMapping("/me/password")
    public ResponseEntity<String> changeMyPassword(
            @RequestBody ChangePasswordRequest request
    ) {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        userService.changePassword(userId, request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }


}
