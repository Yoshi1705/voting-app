package com.example.votingsystem.dao;

public class StopElectionRequest {

  private Long electionId;

  public StopElectionRequest(Long electionId) {
    this.electionId = electionId;
  }

  public Long getElectionId() {
    return electionId;
  }

  public void setElectionId(Long electionId) {
    this.electionId = electionId;
  }
}
