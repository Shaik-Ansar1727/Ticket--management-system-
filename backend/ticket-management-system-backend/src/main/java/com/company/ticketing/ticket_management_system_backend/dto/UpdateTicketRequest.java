package com.company.ticketing.ticket_management_system_backend.dto;

import com.company.ticketing.ticket_management_system_backend.enums.TicketLabel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTicketRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private TicketLabel label;

    @NotNull
    private Long assignedToUserId;
}
