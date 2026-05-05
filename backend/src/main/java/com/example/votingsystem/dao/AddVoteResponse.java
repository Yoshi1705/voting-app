package com.example.votingsystem.dao;

public class AddVoteResponse {

  private Long candidateId;
  private String userEmail;
  private String message;

  public AddVoteResponse(Long candidateId, String userEmail, String message) {
    this.candidateId = candidateId;
    this.userEmail = userEmail;
    this.message = message;
  }

  public Long getCandidateName() {
    return candidateId;
  }

  public void setCandidateName(Long candidateId) {
    this.candidateId = candidateId;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}