package com.company.ticketing.ticket_management_system_backend.controller;


import com.company.ticketing.ticket_management_system_backend.dto.*;
import com.company.ticketing.ticket_management_system_backend.entity.Ticket;
import com.company.ticketing.ticket_management_system_backend.entity.TicketComment;
import com.company.ticketing.ticket_management_system_backend.entity.TicketStatusHistory;
import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import com.company.ticketing.ticket_management_system_backend.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.company.ticketing.ticket_management_system_backend.dto.UpdateTicketRequest;


import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private  final TicketService ticketService;

    public TicketController(TicketService ticketService){
        this.ticketService=ticketService;
    }


    @PostMapping
    public ResponseEntity<TicketResponse> createTicket(
            @Valid @RequestBody CreateTicketRequest request
    ) {

        Ticket ticket = ticketService.createTicket(request);
        TicketResponse response = new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getLabel(),
                ticket.getStatus(),
                ticket.getCreatedBy().getId(),
                ticket.getAssignedTo().getId(),
                ticket.getAttachments()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public  ResponseEntity<List<TicketResponse>> getAllTickets(){
        List<Ticket> tickets = ticketService.getAllTickets();

        List<TicketResponse> responses = tickets.stream()
                .map(ticket -> new TicketResponse(
                        ticket.getId(),
                        ticket.getTitle(),
                        ticket.getDescription(),
                        ticket.getLabel(),
                        ticket.getStatus(),
                        ticket.getCreatedBy().getId(),
                        ticket.getAssignedTo().getId(),
                        ticket.getAttachments()
                ))
                .toList();
        return ResponseEntity.ok(responses);

    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<TicketResponse> getTicketById(
            @PathVariable Long ticketId
    ) {
        Ticket ticket = ticketService.getTicketById(ticketId);
        TicketResponse response = new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getLabel(),
                ticket.getStatus(),
                ticket.getCreatedBy().getId(),
                ticket.getAssignedTo().getId(),
                ticket.getAttachments()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/assigned-to-me")
    public ResponseEntity <List<TicketResponse>> getTicketsAssignedToUser(
    ) {

        Long userId = (Long) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        List<Ticket> tickets = ticketService.getTicketsAssignedToUser(userId);
        List<TicketResponse >   responses = tickets.stream()
                .map(ticket -> new TicketResponse(
                        ticket.getId(),
                        ticket.getTitle(),
                        ticket.getDescription(),
                        ticket.getLabel(),
                        ticket.getStatus(),
                        ticket.getCreatedBy().getId(),
                        ticket.getAssignedTo().getId(),
                        ticket.getAttachments()
                ))
                .toList();

        return ResponseEntity.ok(responses);
    }

    @PatchMapping ("/{ticketId}/status" )
    public ResponseEntity<TicketResponse> updateTicketStatus(
            @PathVariable Long ticketId,
            @Valid @RequestBody UpdateTicketStatusRequest request){
        TicketStatus newStatus = request.getNewStatus();
        Ticket ticket = ticketService.updateTicketStatus(ticketId, newStatus);
        TicketResponse response = new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getLabel(),
                ticket.getStatus(),
                ticket.getCreatedBy().getId(),
                ticket.getAssignedTo().getId(),
                ticket.getAttachments()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping ("/{ticketId}/status-history" )
    public  ResponseEntity<List<TicketStatusHistoryResponse>> getTicketStatusHistory(
            @PathVariable Long ticketId){
        List<TicketStatusHistory> historyList = ticketService.getTicketStatusHistory(ticketId);
        List<TicketStatusHistoryResponse> response = historyList.stream()
                .map(history -> new TicketStatusHistoryResponse(
                        history.getOldStatus(),
                        history.getNewStatus(),
                        history.getChangedBy().getUsername(),
                        history.getChangedAt()
                ))
                .toList();


        return  ResponseEntity.ok(response);
    }

    @PostMapping("/{ticketId}/comments")
    public ResponseEntity<TicketCommentResponse> addComment(
            @PathVariable Long ticketId,
            @Valid @RequestBody AddCommentRequest request) {

        TicketComment ticketComment = ticketService.addComment(ticketId, request.getContent());

          TicketCommentResponse response = new TicketCommentResponse(
                  ticketComment.getContent(),
                  ticketComment.getAuthor().getUsername(),
                    ticketComment.getCreatedAt()
          );

          return  ResponseEntity.ok(response);
    }

    @GetMapping("/{ticketId}/comments")
    public ResponseEntity<List<TicketCommentResponse>> getCommentsForTicket(
            @PathVariable Long ticketId) {
        List<TicketComment> comments = ticketService.getCommentsForTicket(ticketId);
        List<TicketCommentResponse> responses = comments.stream()
                .map(comment -> new TicketCommentResponse(
                        comment.getContent(),
                        comment.getAuthor().getUsername(),
                        comment.getCreatedAt()
                ))
                .toList();
        return ResponseEntity.ok(responses);
    }


    @PutMapping("/{ticketId}")
    public ResponseEntity<TicketResponse> updateTicket(
            @PathVariable Long ticketId,
            @Valid @RequestBody UpdateTicketRequest request
    ) {
        Ticket ticket = ticketService.updateTicket(ticketId, request);

        TicketResponse response = new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getLabel(),
                ticket.getStatus(),
                ticket.getCreatedBy().getId(),
                ticket.getAssignedTo().getId(),
                ticket.getAttachments()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long ticketId) {
        ticketService.deleteTicket(ticketId);
        return ResponseEntity.noContent().build(); // 204
    }


}
