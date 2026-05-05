package com.example.votingsystem.dao;

public class AddVoteRequest {

  private Long candidateId;
  private Long electionId;

  public AddVoteRequest(Long candidateId, Long electionId) {
    this.candidateId = candidateId;
    this.electionId = electionId;
  }

  public Long getElectionId() {
    return electionId;
  }

  public void setElectionId(Long electionId) {
    this.electionId = electionId;
  }

  public Long getCandidateId() {
    return candidateId;
  }

  public void setCandidateId(Long candidateId) {
    this.candidateId = candidateId;
  }
}
