package com.company.ticketing.ticket_management_system_backend.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ApiErrorResponse {

    LocalDateTime timestamp;
    int status;
    String error;
    String message;
    String path;
}
