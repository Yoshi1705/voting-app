package com.example.votingsystem.repo;

import com.example.votingsystem.models.Election;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectionRepository extends JpaRepository<Election, Long> {

  Optional<Election> findByElectionId(Long electionId);

}
