package com.company.ticketing.ticket_management_system_backend.config.bootstrap;

import com.company.ticketing.ticket_management_system_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.company.ticketing.ticket_management_system_backend.enums.UserRole;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.enums.UserStatus;



@Component
public class AdminBootstrap implements  CommandLineRunner {
    private final  UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;




    public  AdminBootstrap(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository= userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public  void  run(String... args) throws  Exception{

    boolean adminExists = userRepository.existsByRole(UserRole.ADMIN);




        if (adminExists) {

            System.out.println("Admin already exists. Skipping bootstrap.");
            return;
        }

        User admin = new User();
        admin.setEmail("admin@company.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(UserRole.ADMIN);
        admin.setStatus(UserStatus.ACTIVE);
        admin.setDisplayPicture("default-admin.png");
        admin.setBio("System Administrator");
        admin.setUsername("admin");
        userRepository.save(admin);

        System.out.println("Default admin created.");




    }
}
