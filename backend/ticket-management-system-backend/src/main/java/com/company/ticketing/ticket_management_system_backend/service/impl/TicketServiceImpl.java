package com.company.ticketing.ticket_management_system_backend.service.impl;

import com.company.ticketing.ticket_management_system_backend.dto.CreateTicketRequest;
import com.company.ticketing.ticket_management_system_backend.entity.Ticket;
import com.company.ticketing.ticket_management_system_backend.entity.TicketStatusHistory;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.enums.TicketLabel;
import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import com.company.ticketing.ticket_management_system_backend.enums.UserStatus;
import com.company.ticketing.ticket_management_system_backend.repository.TicketRepository;
import com.company.ticketing.ticket_management_system_backend.repository.TicketStatusHistoryRepository;
import com.company.ticketing.ticket_management_system_backend.repository.UserRepository;
import com.company.ticketing.ticket_management_system_backend.service.TicketService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TicketServiceImpl implements TicketService {

    private  final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private  final TicketStatusHistoryRepository ticketStatusHistoryRepository;

    public TicketServiceImpl(TicketRepository ticketRepository, UserRepository userRepository, TicketStatusHistoryRepository ticketStatusHistoryRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.ticketStatusHistoryRepository= ticketStatusHistoryRepository;
    }


    @Override
    public Ticket createTicket(CreateTicketRequest request) {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        Long loggedInUserId = (Long) authentication.getPrincipal();

        User createdBy = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Logged-in user not found"));

        User assignedTo = userRepository.findById(request.getAssignedToUserId())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        if (assignedTo.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException("Assigned user is not ACTIVE");
        }

        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setLabel(request.getLabel());
        ticket.setCreatedBy(createdBy);
        ticket.setAssignedTo(assignedTo);
        ticket.setStatus(TicketStatus.TODO);
        ticket.setAttachments(request.getAttachments());

        return ticketRepository.save(ticket);
    }


    @Override
    public Ticket getTicketById(Long ticketId){
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        return  ticket;
    }

    @Override
    public  List<Ticket> getAllTickets(){

        return ticketRepository.findAll();
    }


    @Override
    public  List<Ticket> getTicketsAssignedToUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ticketRepository.findAllByAssignedTo(user);

    }

    @Override
    public Ticket updateTicketStatus(Long ticketId, TicketStatus newStatus){
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if(ticket.getStatus() == TicketStatus.DEPLOYED_DONE){
            throw new RuntimeException("Ticket is already deployed and cannot be modified");
        }
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        Long loggedInUserId = (Long) authentication.getPrincipal();

        User loggedInUser = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Logged-in user not found"));

        boolean isAdmin = loggedInUser.getRole().name().equals("ADMIN");

        boolean isAssignedUser = ticket.getAssignedTo().getId().equals(loggedInUserId);


        if(!isAdmin && !isAssignedUser){
            throw new RuntimeException("Only ADMIN or assigned user can update the ticket status");
        }




        TicketStatus oldStatus = ticket.getStatus();

        if (!isValidTransition(oldStatus, newStatus, isAdmin)) {
            throw new RuntimeException("Invalid status transition");
        }

        ticket.setStatus(newStatus);
        ticketRepository.save(ticket);

        TicketStatusHistory history = new TicketStatusHistory();
        history.setTicket(ticket);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(loggedInUser);

        ticketStatusHistoryRepository.save(history);

        return ticket;



    }


    private boolean isValidTransition(
            TicketStatus oldStatus,
            TicketStatus newStatus,
            boolean isAdmin
    ) {

        if (
                (oldStatus == TicketStatus.TODO && newStatus == TicketStatus.IN_PROGRESS) ||
                        (oldStatus == TicketStatus.IN_PROGRESS && newStatus == TicketStatus.PAUSED) ||
                        (oldStatus == TicketStatus.PAUSED && newStatus == TicketStatus.IN_PROGRESS) ||
                        (oldStatus == TicketStatus.IN_PROGRESS && newStatus == TicketStatus.PR_REVIEW)
        ) {
            return true;
        }


        if (isAdmin &&
                (
                        (oldStatus == TicketStatus.PR_REVIEW && newStatus == TicketStatus.READY_TO_DEPLOY) ||
                                (oldStatus == TicketStatus.READY_TO_DEPLOY && newStatus == TicketStatus.DEPLOYED_DONE)
                )
        ) {
            return true;
        }

        return false;
    }

    public  List<TicketStatusHistory> getTicketStatusHistory(Long ticketId){
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        return ticketStatusHistoryRepository.findStatusHistoryByTicket(ticket);
    }



}
