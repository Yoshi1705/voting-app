package com.example.votingsystem.dao;

public class RegisterResponse {

  private String status;
  private String message;
  private Long userId;

  public RegisterResponse(String status, String message, Long userId) {
    this.status = status;
    this.message = message;
    this.userId = userId;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }


}
