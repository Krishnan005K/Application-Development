// package com.mockinterview.mockinterview.service.implementation;

// import com.mockinterview.mockinterview.model.User;
// import com.mockinterview.mockinterview.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class UserDetailsServiceImpl implements UserDetailsService {

//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @Autowired
//     public UserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         User user = userRepository.findByEmail(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

//         return org.springframework.security.core.userdetails.User.builder()
//                 .username(user.getEmail())
//                 .password(user.getPassword())
//                 .authorities(user.getRoles().toArray(new String[0]))
//                 .build();
//     }

//     public void saveUser(User user) {
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         userRepository.save(user);
//     }
// }
