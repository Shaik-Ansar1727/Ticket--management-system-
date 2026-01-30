package com.company.ticketing.ticket_management_system_backend.entity;


import com.company.ticketing.ticket_management_system_backend.enums.UserRole;
import com.company.ticketing.ticket_management_system_backend.enums.UserStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false,unique = true)
    String email;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    String username;

    @Column(nullable = false)
    String displayPicture;

    @Column(nullable = true)
    String bio;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    UserRole role;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    UserStatus status = UserStatus.PENDING;

    @CreationTimestamp
    @Column(updatable = false)
    LocalDateTime createdAt;

    @UpdateTimestamp
    LocalDateTime updatedAt;
}
