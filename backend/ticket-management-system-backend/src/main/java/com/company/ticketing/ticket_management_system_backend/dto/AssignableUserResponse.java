package com.company.ticketing.ticket_management_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AssignableUserResponse {

    private Long id;
    private String username;
    private String email;
}
