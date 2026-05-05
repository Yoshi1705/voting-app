package com.example.votingsystem.dao;

public class StopElectionResponse {

  private Long electionId;
  private boolean electionStatus;


  public StopElectionResponse(Long electionId, boolean electionStatus) {
    this.electionId = electionId;
    this.electionStatus = electionStatus;
  }

  public Long getElectionId() {
    return electionId;
  }

  public void setElectionId(Long electionId) {
    this.electionId = electionId;
  }

  public boolean isElectionStatus() {
    return electionStatus;
  }

  public void setElectionStatus(boolean electionStatus) {
    this.electionStatus = electionStatus;
  }
}
