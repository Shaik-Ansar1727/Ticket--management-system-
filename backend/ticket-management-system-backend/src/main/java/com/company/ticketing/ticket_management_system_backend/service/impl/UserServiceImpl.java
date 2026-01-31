package com.company.ticketing.ticket_management_system_backend.service.impl;

import com.company.ticketing.ticket_management_system_backend.dto.UserResponse;
import com.company.ticketing.ticket_management_system_backend.entity.User;
import com.company.ticketing.ticket_management_system_backend.enums.UserRole;
import com.company.ticketing.ticket_management_system_backend.repository.UserRepository;
import com.company.ticketing.ticket_management_system_backend.service.UserService;
import org.springframework.stereotype.Service;
import  com.company.ticketing.ticket_management_system_backend.enums.UserStatus;
import java.util.List;
import com.company.ticketing.ticket_management_system_backend.config.security.jwt.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class UserServiceImpl implements UserService {

    private final  UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;


    public  UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public  User registerUser(User user){

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRole.EMPLOYEE);
        user.setStatus(UserStatus.PENDING);

        return userRepository.save(user);
    }

    @Override
    public List<User> getPendingUsers(){

        return  userRepository.findAllByStatus(UserStatus.PENDING);
    }

    @Override
    public   User approveUser(Long userId){
       User user = userRepository.
               findById(userId).orElseThrow(()->new RuntimeException("user not found"));

        if(user.getStatus()!=UserStatus.PENDING){
            throw new RuntimeException();
        }
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
        return user;

    }

    @Override
   public  User rejectUser(Long userId){
        User user = userRepository.
                findById(userId).orElseThrow(()->new RuntimeException("user not found"));
        if(user.getStatus()!=UserStatus.PENDING){
            throw new RuntimeException();
        }
        user.setStatus(UserStatus.REJECTED);
        userRepository.save(user);
        return user;
   }

   @Override
    public  User getUserById(Long userId){

        return  userRepository.findById(userId).orElseThrow(()->new RuntimeException("user not found"));
   }

   @Override
   public  String login(String email, String password){

       User user = userRepository.findByEmail(email);
       if(user==null){
           throw new RuntimeException("user not found");
       }
       if (user.getStatus() != UserStatus.ACTIVE) {
           throw new RuntimeException("user not allowed");
       }

       if (!passwordEncoder.matches(password, user.getPassword())) {
           throw new RuntimeException("wrong email or password");
       }

       return jwtUtil.generateToken(user);

   }


   public UserResponse mapToUserResponse(User user) {
       UserResponse userResponse = new UserResponse();
       userResponse.setId(user.getId());
       userResponse.setUsername(user.getUsername());
       userResponse.setEmail(user.getEmail());
       userResponse.setRole(user.getRole().name());
       userResponse.setStatus(user.getStatus().name());
       userResponse.setBio(user.getBio());
       userResponse.setDisplayPicture(user.getDisplayPicture());
       return userResponse;

   }



}
