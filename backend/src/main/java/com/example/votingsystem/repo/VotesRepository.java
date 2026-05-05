package com.example.votingsystem.repo;

import com.example.votingsystem.models.Election;
import com.example.votingsystem.models.User;
import com.example.votingsystem.models.Votes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VotesRepository extends JpaRepository<Votes, Long> {

  @Query("""
      SELECT COUNT(v) > 0
      FROM Votes v
      WHERE v.user = :user AND v.election = :election
      """)
  boolean hasUserVotedInElection(@Param("user") User user, @Param("election") Election election);
}
