package com.example.votingsystem.service;

import com.example.votingsystem.dao.LoginRequest;
import com.example.votingsystem.dao.RegisterRequest;
import com.example.votingsystem.models.Role;
import com.example.votingsystem.models.User;
import com.example.votingsystem.repo.RoleRepository;
import com.example.votingsystem.repo.UserRepository;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final RoleRepository rolerepository;

  public AuthService(
      UserRepository userRepository,
      AuthenticationManager authenticationManager,
      PasswordEncoder passwordEncoder, RoleRepository rolerepository) {
    this.userRepository = userRepository;
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
    this.rolerepository = rolerepository;
  }

  @Transactional
  public Long register(RegisterRequest request) {
    System.out.println("log1");
    System.out.println(request.getEmailId());

    boolean exists = false;

    try {
      exists = userRepository.existsByEmail(request.getEmailId());
      System.out.println("After exists check: " + exists);
    } catch (Exception e) {
      System.out.println("ERROR OCCURRED");
      e.printStackTrace();
    }

    if (exists) {
      System.out.println("gng inside");
      throw new RuntimeException("Email already Exists!");
    }
    if (request.getName() == null || request.getName().trim().isEmpty()) {
      throw new IllegalArgumentException("Name is required");
    }
    if (request.getEmailId() == null || !request.getEmailId().contains("@")) {
      throw new IllegalArgumentException("Valid email is required");
    }
    if (request.getPassword() == null || request.getPassword().length() < 8) {
      throw new IllegalArgumentException("Password must be at least 8 characters");
    }
    String hashedPassword = passwordEncoder.encode(request.getPassword());
    Optional<Role> role = rolerepository.findById(request.getRoleId());
    Role r1 = role.orElseThrow(() -> new RuntimeException("Role not found"));

    User user = new User(request.getName(), request.getEmailId(), hashedPassword, r1);
    userRepository.save(user);
    return user.getId();
  }

  public Map<String, String> login(LoginRequest request) {
    UsernamePasswordAuthenticationToken authToken =
        new UsernamePasswordAuthenticationToken(
            request.getEmailId(),
            request.getPassword()
        );
    try {
      Authentication authenticated = authenticationManager.authenticate(authToken);
      String email = authenticated.getName();
      User user = userRepository.findByEmail(email).orElseThrow();
      return Map.of(
          "status", "success",
          "message", "Login successful",
          "email", email, "roleid", String.valueOf(user.getRole().getRole_id()), "name",
          user.getName()
      );
    } catch (BadCredentialsException e) {
      throw new RuntimeException("Invalid credentials");
    } catch (DisabledException e) {
      throw new RuntimeException("User account is blocked");
    } catch (AuthenticationException e) {
      throw new RuntimeException("Authentication failed: " + e.getMessage());
    }
  }
}