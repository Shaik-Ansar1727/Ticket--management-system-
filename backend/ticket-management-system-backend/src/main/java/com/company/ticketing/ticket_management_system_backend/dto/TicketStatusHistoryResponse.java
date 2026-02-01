package com.company.ticketing.ticket_management_system_backend.dto;


import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TicketStatusHistoryResponse {

        TicketStatus oldStatus;
        TicketStatus newStatus;
        String changedBy;
        LocalDateTime changedAt;
}
