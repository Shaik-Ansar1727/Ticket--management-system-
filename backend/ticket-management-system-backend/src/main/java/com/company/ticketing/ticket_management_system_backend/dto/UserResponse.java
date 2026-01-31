package com.company.ticketing.ticket_management_system_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
    private String status;
    private String bio;
    private  String displayPicture;
}
