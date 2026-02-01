package com.company.ticketing.ticket_management_system_backend.dto;


import com.company.ticketing.ticket_management_system_backend.enums.TicketLabel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class CreateTicketRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private TicketLabel label;

    @NotNull
    private Long assignedToUserId;

    private List<String> attachments;


}
