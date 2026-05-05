package com.example.votingsystem.dao;

import com.example.votingsystem.models.Role;

public class ResultsResponseDto {

  private String candidateName;
  private int votes;
  private Role role;

  public ResultsResponseDto(String candidateName, int votes, Role role) {
    this.candidateName = candidateName;
    this.votes = votes;
    this.role = role;
  }

  public String getCandidateName() {
    return candidateName;
  }

  public void setCandidateName(String candidateName) {
    this.candidateName = candidateName;
  }

  public int getVotes() {
    return votes;
  }

  public void setVotes(int votes) {
    this.votes = votes;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
