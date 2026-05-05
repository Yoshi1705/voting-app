package com.example.votingsystem.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Jwtutils {

  @Value("${jwt.secret}")
  private String secretKey;

  @Value("${jwt.expiry}")
  private String expiryStr;

  public String generateToken(String username) {
    Long expiry = Long.parseLong(expiryStr);
    return Jwts.builder().setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiry))
        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
        .compact();
  }

  public String readToken(String token) {
    Boolean checkSignature = Jwts.parser().isSigned(token);
    if (checkSignature) {
      Claims claim = Jwts.parserBuilder()
          .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
          .build()
          .parseClaimsJws(token).getBody();
      return claim.getSubject();
    }
    return null;
  }
}
