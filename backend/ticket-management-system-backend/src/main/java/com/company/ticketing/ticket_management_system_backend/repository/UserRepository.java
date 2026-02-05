package com.company.ticketing.ticket_management_system_backend.repository;

import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.enums.UserRole;
import com.company.ticketing.ticket_management_system_backend.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

        boolean existsByEmail (String email);

        User findByEmail (String email);

        List<User> findAllByStatus(UserStatus status);

        boolean existsByRole(UserRole role);

        List<User> findAllByRoleAndStatus(UserRole role, UserStatus status);


}
