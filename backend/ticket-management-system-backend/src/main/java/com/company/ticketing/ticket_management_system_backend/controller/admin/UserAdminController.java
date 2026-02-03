package com.company.ticketing.ticket_management_system_backend.controller.admin;


import com.company.ticketing.ticket_management_system_backend.dto.UserResponse;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.enums.UserRole;
import com.company.ticketing.ticket_management_system_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.company.ticketing.ticket_management_system_backend.dto.ChangePasswordRequest;
import com.company.ticketing.ticket_management_system_backend.enums.UserRole;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/users")
public class UserAdminController {

    private final UserService userService;

    public UserAdminController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/pending")
    public ResponseEntity<List<UserResponse>> getPendingUsers() {
        List<UserResponse> response = userService.getPendingUsers()
                .stream()
                .map(userService::mapToUserResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/approve")
    public UserResponse approveUser(@PathVariable  Long userId) {
        User user = userService.approveUser(userId);
        return userService.mapToUserResponse(user);
    }


    @PostMapping("/{userId}/reject")
    public  UserResponse rejectUser(@PathVariable  Long userId) {
        User user = userService.rejectUser(userId);
        return userService.mapToUserResponse(user);
    }


    @GetMapping("/{userId}")
    public  UserResponse getUserById(@PathVariable  Long userId) {
        User user = userService.getUserById(userId);
        return userService.mapToUserResponse(user);
    }


    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers()
                .stream()
                .map(userService::mapToUserResponse)
                .toList();

        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {

        User user = userService.getUserById(userId);

        if (user.getRole() == UserRole.ADMIN) {
            throw new RuntimeException("Admin users cannot be deleted");
        }

        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<String> changeUserPassword(
            @PathVariable Long userId,
            @RequestBody ChangePasswordRequest request
    ) {

        User user = userService.getUserById(userId);

        if (user.getRole() == UserRole.ADMIN) {
            throw new RuntimeException("Cannot change password of another admin");
        }

        userService.adminChangePassword(userId, request.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }



}
