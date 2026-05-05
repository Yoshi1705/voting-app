package com.example.votingsystem.dao;

public class RemoveCanRequest {

  private Long candidateId;

  public RemoveCanRequest(Long candidateId) {
    this.candidateId = candidateId;
  }

  public Long getCandidateId() {
    return candidateId;
  }

  public void setCandidateId(Long candidateId) {
    this.candidateId = candidateId;
  }
}
