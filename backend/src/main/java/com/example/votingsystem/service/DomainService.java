package com.example.votingsystem.service;

import com.example.votingsystem.dao.AddVoteRequest;
import com.example.votingsystem.dao.CreateCanRequest;
import com.example.votingsystem.dao.RemoveCanRequest;
import com.example.votingsystem.dao.StartElectionRequest;
import com.example.votingsystem.dao.StopElectionRequest;
import com.example.votingsystem.models.Candidate;
import com.example.votingsystem.models.Election;
import com.example.votingsystem.models.Role;
import com.example.votingsystem.models.User;
import com.example.votingsystem.models.Votes;
import com.example.votingsystem.repo.CandidateRepository;
import com.example.votingsystem.repo.ElectionRepository;
import com.example.votingsystem.repo.RoleRepository;
import com.example.votingsystem.repo.UserRepository;
import com.example.votingsystem.repo.VotesRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class DomainService {

  @Autowired
  CandidateRepository candidateRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  VotesRepository votesRepository;
  @Autowired
  RoleRepository roleRepository;
  @Autowired
  ElectionRepository electionRepository;

  public List<Candidate> results(String id) {
    Long electionId = Long.parseLong(id);

    Election election = electionRepository.findByElectionId(electionId).orElseThrow();
    if (election.isStatus()) {
      throw new RuntimeException("Cant release results elections are ongoing!");
    }

    return candidateRepository.findAll();
  }

  public List<Candidate> totalvotes() {
    return candidateRepository.findAll();
  }

  public User createCandidate(CreateCanRequest req) {
    Long userId = req.getUserId();

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    Candidate can = new Candidate();
    can.setVotes(0);
    can.setCandidate(user);

    candidateRepository.save(can);
    return user;
  }

  @Transactional
  public User addVote(AddVoteRequest req) {
    Long candidateId = req.getCandidateId();
    Long electionId = req.getElectionId();
    Election election = electionRepository.findByElectionId(electionId).orElseThrow();
    if (!election.isStatus()) {
      throw new IllegalStateException("Elections are stopped you can't vote now");
    }
    Candidate can = null;
    try {
      can = candidateRepository.findByCandidate_UserId(candidateId).orElseThrow();
    } catch (Exception e) {
      System.out.println(
          "fetching candidate with id " + candidateId + " and got errror" + e.getMessage());
    }
    if (!can.isActive()) {
      throw new IllegalStateException("Candidate is inactive");
    }
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();
    System.out.println("got user mail" + email);
    User user = userRepository.findByEmail(email).orElseThrow();
    if (votesRepository.hasUserVotedInElection(user, election)) {
      throw new IllegalStateException("User has already voted in this election");
    }
    Votes vote = new Votes();
    vote.setCandidate(can);
    vote.setUser(user);
    vote.setElection(election);
    can.setVotes(can.getVotes() + 1);
    votesRepository.save(vote);
    return user;
  }

  public void removeCandidate(RemoveCanRequest req) {
    Long candidateId = req.getCandidateId();
    Candidate can = null;
    try {
      can = candidateRepository.findByCandidate_UserId(candidateId).orElseThrow();
    } catch (Exception e) {
      System.out.println(
          "fetching candidate with id " + candidateId + " and got errror" + e.getMessage());
    }
    can.setActive(false);
    User user = can.getCandidate();
    Role role = roleRepository.findById(1L)
        .orElseThrow(() -> new RuntimeException("Role not found"));

    user.setRole(role);
    userRepository.save(user);
  }

  @Transactional
  public void startElection(StartElectionRequest req) {
    Long electionId = req.getElectionId();
    Election election = electionRepository.findByElectionId(electionId).orElseThrow();
    election.setStatus(true);
    electionRepository.save(election);
  }

  @Transactional
  public Election stopElection(StopElectionRequest req) {
    Long electionId = req.getElectionId();
    Election election = electionRepository.findByElectionId(electionId).orElseThrow();
    election.setStatus(false);
    System.out.println(election.isStatus() + " " + election.getElectionId());
    return election;
  }

  @Transactional
  public boolean getElectionStatus(String id) {
    long electionId = Long.parseLong(id);
    Election election = null;
    try {
      election = electionRepository.findByElectionId(electionId).orElseThrow();
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return election.isStatus();
  }


}
