package com.company.ticketing.ticket_management_system_backend.controller;

import com.company.ticketing.ticket_management_system_backend.dto.AssignableUserResponse;
import com.company.ticketing.ticket_management_system_backend.dto.ChangePasswordRequest;
import com.company.ticketing.ticket_management_system_backend.dto.UserResponse;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

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
        user.setUsername(request.getUsername());
        user.setBio(request.getBio());

        if (request.getDisplayPicture() != null) {
            user.setDisplayPicture(request.getDisplayPicture());
        }


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

    @GetMapping("/assignable")
    public ResponseEntity<List<AssignableUserResponse>> getAssignableUsers() {

        System.out.println(">>> HIT /users/assignable");
        return ResponseEntity.ok(userService.getAssignableUsers());
    }



    @PostMapping("/me/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        System.out.println("File received: " + file);
        System.out.println("File name: " + file.getOriginalFilename());
        System.out.println("Content type: " + file.getContentType());
        System.out.println("File size: " + file.getSize());


        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is required");
        }

        String contentType = file.getContentType();
        if (contentType == null ||
                !(contentType.equals("image/png")
                        || contentType.equals("image/jpeg")
                        || contentType.equals("image/jpg"))) {
            return ResponseEntity.badRequest().body("Only PNG/JPG images allowed");
        }

        String extension = contentType.equals("image/png") ? ".png" : ".jpg";
        String fileName = "user_" + userId + extension;

        Path uploadPath = Paths.get("uploads/profile-pictures");
        Files.createDirectories(uploadPath);

        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());

        User user = userService.getUserById(userId);
        String imageUrl = "/uploads/profile-pictures/" + fileName;
        user.setDisplayPicture(imageUrl);
        userService.updateUser(user);


        return ResponseEntity.ok(imageUrl);
    }



}
