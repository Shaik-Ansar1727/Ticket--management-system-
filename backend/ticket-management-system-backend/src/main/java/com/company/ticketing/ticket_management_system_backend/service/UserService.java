package com.company.ticketing.ticket_management_system_backend.service;

import com.company.ticketing.ticket_management_system_backend.dto.UserResponse;
import com.company.ticketing.ticket_management_system_backend.entity.User;

import java.util.List;

public interface UserService {

    User registerUser(User user);

    List<User> getPendingUsers();

    User approveUser(Long userId);

    User rejectUser(Long userId);

    User getUserById(Long userId);

    String login(String email, String password);

    UserResponse mapToUserResponse(User user);

}
