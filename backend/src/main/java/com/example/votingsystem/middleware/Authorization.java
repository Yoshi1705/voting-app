package com.example.votingsystem.middleware;

import com.example.votingsystem.service.UserService;
import com.example.votingsystem.utils.Jwtutils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class Authorization extends OncePerRequestFilter {

  @Autowired
  private Jwtutils jwtutils;

  @Autowired
  private UserService userService;


  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.split(" ")[1];
      if (!token.isEmpty()) {
        String email = jwtutils.readToken(token);
        if (email != null) {
          System.out.println("User has genuine token" + email);
          UserDetails user = userService.loadUserByUsername(email);

          UsernamePasswordAuthenticationToken auth = new
              UsernamePasswordAuthenticationToken(email, user, user.getAuthorities());
          SecurityContextHolder.getContext().setAuthentication(auth);

        }
      }
    }
    filterChain.doFilter(request, response);

  }
}
