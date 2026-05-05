package com.example.votingsystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  private String name;

  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String passwordHash;

  private boolean status;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private LocalDateTime lastLogin;

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  private Role role;

  public User() {

  }

  public User(String name, String email, String passwordHash, Role role) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;               // default
    this.status = true;         // default
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
    this.lastLogin = LocalDateTime.now();
  }

  public Long getId() {
    return userId;
  }

  public void setUser_id(Long user_id) {
    this.userId = userId;
  }

  public void setLastLogin(LocalDateTime lastLogin) {
    this.lastLogin = lastLogin;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public boolean getStatus() {
    return status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

}