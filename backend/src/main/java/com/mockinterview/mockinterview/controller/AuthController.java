package com.mockinterview.mockinterview.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mockinterview.mockinterview.dto.AuthRequest;
import com.mockinterview.mockinterview.model.User;
import com.mockinterview.mockinterview.repository.UserRepository;
import com.mockinterview.mockinterview.service.JwtService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/home")
    public String Home() {
        return "Initial Render Page.!";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String userRole = userDetails.getAuthorities().iterator().next().getAuthority();

            String jwtToken = jwtService.generateToken(authRequest.getEmail());

            // Fetch the user from the database using the email
            User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Prepare the response model
            Map<String, Object> responseModel = new HashMap<>();
            responseModel.put("token", jwtToken);
            responseModel.put("role", userRole);
            responseModel.put("email", authRequest.getEmail());
            responseModel.put("userId", user.getId());// Add user ID to the response

            return ResponseEntity.ok(responseModel);

        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}
