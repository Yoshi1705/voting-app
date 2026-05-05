package com.example.votingsystem.dao;

public class CreateCanRequest {

  private Long userId;

  public CreateCanRequest(Long userId) {
    this.userId = userId;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }
}
