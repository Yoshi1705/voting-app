package com.example.votingsystem.dao;

public class RegisterRequest {

  private String name;
  private String emailId;
  private String password;
  private Long roleId;

  public RegisterRequest() {

  }

  public RegisterRequest(String name, String emailId, String password, Long roleId) {
    this.name = name;
    this.emailId = emailId;
    this.password = password;
    this.roleId = roleId;
  }

  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmailId() {
    return emailId;
  }

  public void setEmailId(String emailId) {
    this.emailId = emailId;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
