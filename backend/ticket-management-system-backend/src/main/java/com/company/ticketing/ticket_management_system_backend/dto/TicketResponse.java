package com.company.ticketing.ticket_management_system_backend.dto;


import com.company.ticketing.ticket_management_system_backend.enums.TicketLabel;
import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class TicketResponse {

    public Long id;
    public String title;
    public String description;
    public TicketLabel label;
    public TicketStatus status;
    public Long createdByUser;
    public Long assignedToUser;
    public List<String> attachments;
}
