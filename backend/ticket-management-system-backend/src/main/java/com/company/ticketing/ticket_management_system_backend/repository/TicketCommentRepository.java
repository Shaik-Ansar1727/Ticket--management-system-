package com.company.ticketing.ticket_management_system_backend.repository;

import com.company.ticketing.ticket_management_system_backend.entity.Ticket;
import com.company.ticketing.ticket_management_system_backend.entity.TicketComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketCommentRepository extends JpaRepository<TicketComment, Long> {

    @Query("""
        SELECT tc
        FROM TicketComment tc
        WHERE tc.ticket = :ticket
        ORDER BY tc.createdAt ASC
    """)
    List<TicketComment> findAllByTickets(Ticket ticket);
}
