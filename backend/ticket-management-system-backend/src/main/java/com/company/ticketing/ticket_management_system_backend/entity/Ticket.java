package com.company.ticketing.ticket_management_system_backend.entity;

import com.company.ticketing.ticket_management_system_backend.enums.TicketLabel;
import com.company.ticketing.ticket_management_system_backend.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ticket")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            Long id;

            @Column(nullable = false)
            String title;

            @Column(nullable = false)
            String description;

            @Enumerated(EnumType.STRING)
            @Column(nullable = false)
            TicketLabel label;

            @Enumerated(EnumType.STRING)
            @Column(nullable = false)
            TicketStatus status;

            @ManyToOne
            @JoinColumn(name = "created_by_id", nullable = false)
             User createdBy;


            @ManyToOne
            @JoinColumn(name = "assigned_to_id")
            User assignedTo;

            @Column(updatable = false, insertable = true)
            @CreationTimestamp
            LocalDateTime createdAt;

            @Column(updatable = true)
            @UpdateTimestamp
            LocalDateTime updatedAt;

            @Column(name = "attachment")
            @ElementCollection
            @CollectionTable(name = "ticket_attachments", joinColumns = @JoinColumn(name = "ticket_id"))
            List<String> attachments;


}
