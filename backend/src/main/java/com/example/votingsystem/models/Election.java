package com.example.votingsystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "election")
public class Election {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "electionId")
  private Long electionId;

  private boolean status;

  public Election() {

  }

  public Election(Long electionId, boolean status) {
    this.electionId = electionId;
    this.status = status;
  }

  public Long getElectionId() {
    return electionId;
  }

  public void setElectionId(Long electionId) {
    this.electionId = electionId;
  }

  public boolean isStatus() {
    return status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }
}
