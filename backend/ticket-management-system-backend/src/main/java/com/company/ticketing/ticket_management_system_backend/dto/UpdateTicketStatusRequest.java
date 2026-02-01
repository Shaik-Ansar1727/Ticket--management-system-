package com.company.ticketing.ticket_management_system_backend.dto;


import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateTicketStatusRequest {

    @NotNull
    public  TicketStatus newStatus;

}
