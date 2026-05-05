package com.example.votingsystem.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "votes",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "election_id"})
)
public class Votes {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long vote_id;

  @ManyToOne
  @JoinColumn(name = "candidate_id", nullable = false)
  private Candidate candidate;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "election_id", nullable = false)
  private Election election;

  public Votes() {

  }

  public Votes(Long vote_id, Candidate candidate, User user, Election election) {
    this.vote_id = vote_id;
    this.candidate = candidate;
    this.user = user;
    this.election = election;
  }

  public Long getVote_id() {
    return vote_id;
  }

  public void setVote_id(Long vote_id) {
    this.vote_id = vote_id;
  }

  public Candidate getCandidate() {
    return candidate;
  }

  public void setCandidate(Candidate candidate) {
    this.candidate = candidate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Election getElection() {
    return election;
  }

  public void setElection(Election election) {
    this.election = election;
  }
}
