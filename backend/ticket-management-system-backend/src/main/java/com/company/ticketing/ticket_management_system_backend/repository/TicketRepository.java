package com.company.ticketing.ticket_management_system_backend.repository;

import com.company.ticketing.ticket_management_system_backend.entity.Ticket;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findAllByCreatedBy(User user);

    List<Ticket> findAllByAssignedTo(User user);

}
