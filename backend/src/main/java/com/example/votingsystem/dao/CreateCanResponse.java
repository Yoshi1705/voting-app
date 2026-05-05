package com.example.votingsystem.dao;

public class CreateCanResponse {

  private String canName;
  private String message;

  public CreateCanResponse(String canName, String message) {
    this.canName = canName;
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getCanName() {
    return canName;
  }

  public void setCanName(String canName) {
    this.canName = canName;
  }
}
