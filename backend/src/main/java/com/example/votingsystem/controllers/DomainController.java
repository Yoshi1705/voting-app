package com.example.votingsystem.controllers;

import com.example.votingsystem.dao.AddVoteRequest;
import com.example.votingsystem.dao.AddVoteResponse;
import com.example.votingsystem.dao.CreateCanRequest;
import com.example.votingsystem.dao.CreateCanResponse;
import com.example.votingsystem.dao.RemoveCanRequest;
import com.example.votingsystem.dao.ResultsResponseDto;
import com.example.votingsystem.dao.StartElectionRequest;
import com.example.votingsystem.dao.StopElectionRequest;
import com.example.votingsystem.dao.StopElectionResponse;
import com.example.votingsystem.models.Candidate;
import com.example.votingsystem.models.Election;
import com.example.votingsystem.models.User;
import com.example.votingsystem.repo.CandidateRepository;
import com.example.votingsystem.repo.CandidateView;
import com.example.votingsystem.repo.ElectionRepository;
import com.example.votingsystem.repo.RoleRepository;
import com.example.votingsystem.repo.UserRepository;
import com.example.votingsystem.repo.VotesRepository;
import com.example.votingsystem.service.DomainService;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DomainController {

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

  @Autowired
  DomainService domainService;

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping("/start-election")
  public String startElection(@RequestBody StartElectionRequest req) {
    domainService.startElection(req);
    return "Election Started successfully";
  }

  @PreAuthorize("hasRole('COORDINATOR')")
  @PostMapping("/create-candidate")
  public CreateCanResponse postCandidate(@RequestBody CreateCanRequest req) {
    User user = domainService.createCandidate(req);
    return new CreateCanResponse(user.getName(), "candidate created successfully");
  }

  @PostMapping("/addvote")
  public AddVoteResponse addVote(@RequestBody AddVoteRequest req) {
    User user = domainService.addVote(req);
    return new
        AddVoteResponse(req.getCandidateId(), user.getEmail(), "user voted successfully");
  }

  @PreAuthorize("hasRole('COORDINATOR')")
  @Transactional
  @PostMapping("/remove-candidate")
  public String removeCandidate(@RequestBody RemoveCanRequest req) {
    domainService.removeCandidate(req);
    return "Candidate Deleted successfully";
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping("/stop-election")
  public StopElectionResponse stopElection(@RequestBody StopElectionRequest req) {
    Election election = domainService.stopElection(req);
    return new StopElectionResponse(election.getElectionId(), election.isStatus());
  }

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/results/{id}")
  public List<ResultsResponseDto> displayResults(@PathVariable String id) {
    List<Candidate> candidateList = domainService.results(id);

    return candidateList.stream().map(candidate -> new
        ResultsResponseDto(candidate.getCandidate().getName(), candidate.getVotes(),
        candidate.getCandidate().getRole())).collect(
        Collectors.toList());
  }

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/totalvotes")
  public long totalVotes() {
    List<Candidate> candidateList = domainService.totalvotes();
    return candidateList.stream()
        .mapToLong(Candidate::getVotes)
        .sum();
  }

  @GetMapping("/candidates/count")
  public long getCandidatesCount() {
    return candidateRepository.count();
  }

  @GetMapping("/election/status/{id}")
  public boolean electionStatus(@PathVariable String id) {
    return domainService.getElectionStatus(id);
  }

  @GetMapping("/get/candidates")
  public List<CandidateView> getCandidates() {
    return candidateRepository.getAllCandidatesBasic();
  }
}
