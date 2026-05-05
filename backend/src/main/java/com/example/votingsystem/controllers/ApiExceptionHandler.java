package com.example.votingsystem.controllers;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
  public ResponseEntity<Map<String, String>> handleBadRequest(RuntimeException ex) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(Map.of("message", ex.getMessage()));
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Map<String, String>> handleAccessDenied() {
    return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body(Map.of("message", "You are not allowed to perform this action"));
  }
}
