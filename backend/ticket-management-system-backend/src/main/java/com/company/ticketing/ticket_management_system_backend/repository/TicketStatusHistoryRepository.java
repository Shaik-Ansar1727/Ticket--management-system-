package com.company.ticketing.ticket_management_system_backend.repository;

import com.company.ticketing.ticket_management_system_backend.entity.Ticket;
import com.company.ticketing.ticket_management_system_backend.entity.TicketStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketStatusHistoryRepository
        extends JpaRepository<TicketStatusHistory, Long> {

    @Query("""
        SELECT tsh
        FROM TicketStatusHistory tsh
        WHERE tsh.ticket = :ticket
        ORDER BY tsh.changedAt ASC
    """)
    List<TicketStatusHistory> findStatusHistoryByTicket(
            @Param("ticket") Ticket ticket
    );
}
