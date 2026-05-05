package com.example.votingsystem.dao;

public class LoginResponse {

  private String status;
  private String token;
  private String email;
  private String message;
  private long roleId;
  private String name;

  public LoginResponse(String status, String token, String email, String message, long roleId,
      String name) {
    this.status = status;
    this.message = message;
    this.email = email;
    this.token = token;
    this.roleId = roleId;
    this.name = name;
  }

  public long getRoleId() {
    return roleId;
  }

  public void setRoleId(long roleId) {
    this.roleId = roleId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
