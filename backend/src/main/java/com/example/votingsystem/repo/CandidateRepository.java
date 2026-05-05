package com.example.votingsystem.repo;

import com.example.votingsystem.models.Candidate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

  Optional<Candidate> findByCandidate_UserId(Long userId);

  Optional<Candidate> deleteByCandidate_UserId(Long userId);

  long count();

  @Query(""" 
      SELECT c.id AS id, c.candidate.userId AS userId, c.candidate.name AS name
      FROM Candidate c""")
  List<CandidateView> getAllCandidatesBasic();
}
