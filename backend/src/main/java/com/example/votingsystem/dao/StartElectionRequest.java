package com.example.votingsystem.dao;

public class StartElectionRequest {

  private Long electionId;

  public StartElectionRequest(Long electionId) {
    this.electionId = electionId;
  }

  public Long getElectionId() {
    return electionId;
  }

  public void setElectionId(Long electionId) {
    this.electionId = electionId;
  }
}
