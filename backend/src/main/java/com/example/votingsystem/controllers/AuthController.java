package com.example.votingsystem.controllers;

import com.example.votingsystem.dao.LoginRequest;
import com.example.votingsystem.dao.LoginResponse;
import com.example.votingsystem.dao.RegisterRequest;
import com.example.votingsystem.dao.RegisterResponse;
import com.example.votingsystem.service.AuthService;
import com.example.votingsystem.utils.Jwtutils;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private final AuthService authService;

  @Autowired
  private final Jwtutils jwtutils;

  public AuthController(AuthService authService, Jwtutils jwtutils) {
    this.authService = authService;
    this.jwtutils = jwtutils;
  }

  @PostMapping("/register")
  public RegisterResponse registerUser(@RequestBody RegisterRequest request) {
    try {
      Long userId = authService.register(request);
      return new RegisterResponse("CREATED", "user created successfully", userId);
    } catch (RuntimeException e) {
      return new RegisterResponse("FAILED", e.getMessage(), -1L);
    }
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest request) {
    try {
      Map<String, String> response = authService.login(request);

      String token = jwtutils.generateToken(response.get("email"));

      return new LoginResponse(response.get("status"), token, response.get("email"),
          response.get("message"), Long.parseLong(response.get("roleid")), response.get("name"));

    } catch (RuntimeException e) {
      return new
          LoginResponse("FAILED", "token not generaated", "NA", e.getMessage(), -1L,
          "user name is null");
    }
  }
}