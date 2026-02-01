package com.company.ticketing.ticket_management_system_backend.entity;


import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "ticket_status_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TicketStatusHistory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ticket_id")
    Ticket ticket;

    @Enumerated(EnumType.STRING)
    @Column(name = "old_status", nullable = false)
    TicketStatus oldStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false)
    TicketStatus newStatus;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by")
    User changedBy;

    @CreationTimestamp
    @Column(name = "changed_at", updatable = false)
    LocalDateTime changedAt;
}
