package com.company.ticketing.ticket_management_system_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TicketCommentResponse {

    String content;

    String author;

    LocalDateTime createdAt;
}
