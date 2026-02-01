package com.company.ticketing.ticket_management_system_backend.service;

import com.company.ticketing.ticket_management_system_backend.dto.CreateTicketRequest;
import com.company.ticketing.ticket_management_system_backend.dto.TicketResponse;
import com.company.ticketing.ticket_management_system_backend.entity.Ticket;
import com.company.ticketing.ticket_management_system_backend.entity.TicketComment;
import com.company.ticketing.ticket_management_system_backend.entity.TicketStatusHistory;
import com.company.ticketing.ticket_management_system_backend.enums.TicketLabel;
import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;

import java.util.List;

public interface TicketService {

    Ticket createTicket(CreateTicketRequest request);

    Ticket getTicketById(Long ticketId);

    List<Ticket> getAllTickets();


    List<Ticket> getTicketsAssignedToUser(Long userId);

    Ticket updateTicketStatus(Long ticketId, TicketStatus newStatus);

    List<TicketStatusHistory> getTicketStatusHistory(Long ticketId);

    TicketComment addComment(Long ticketId, String content);

    List<TicketComment> getCommentsForTicket(Long ticketId);

}
