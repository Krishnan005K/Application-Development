// package com.mockinterview.mockinterview.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.mockinterview.mockinterview.model.*;
// import com.mockinterview.mockinterview.repository.*;

// @Service
// public class UserServiceImpl {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private StudentRepository studentRepository;

//     @Autowired
//     private InterviewerRepository interviewerRepository;

//     @Autowired
//     private MentorRepository mentorRepository;

//     @Autowired
//     private HeadRepository headRepository;

//     public User saveUser(User user) {
//         // Save user based on role
//         if (user.getRoles().contains("ROLE_STUDENT")) {
//             Student student = new Student();
//             // Copy common attributes from User to Student
//             student.setName(user.getName());
//             student.setEmail(user.getEmail());
//             student.setPassword(user.getPassword());
//             student.setPhoto(user.getPhoto());
//             student.setRoles(user.getRoles());
//             // Set additional attributes for Student
//             student.setDept(user instanceof Student ? ((Student) user).getDept() : null);
//             // Save Student
//             return studentRepository.save(student);
//         } else if (user.getRoles().contains("ROLE_INTERVIEWER")) {
//             Interviewer interviewer = new Interviewer();
//             // Copy common attributes from User to Interviewer
//             interviewer.setName(user.getName());
//             interviewer.setEmail(user.getEmail());
//             interviewer.setPassword(user.getPassword());
//             interviewer.setPhoto(user.getPhoto());
//             interviewer.setRoles(user.getRoles());
//             // Save Interviewer
//             return interviewerRepository.save(interviewer);
//         } else if (user.getRoles().contains("ROLE_MENTOR")) {
//             Mentor mentor = new Mentor();
//             // Copy common attributes from User to Mentor
//             mentor.setName(user.getName());
//             mentor.setEmail(user.getEmail());
//             mentor.setPassword(user.getPassword());
//             mentor.setPhoto(user.getPhoto());
//             mentor.setRoles(user.getRoles());
//             // Set additional attributes for Mentor
//             mentor.setDept(user instanceof Mentor ? ((Mentor) user).getDept() : null);
//             // Save Mentor
//             return mentorRepository.save(mentor);
//         } else if (user.getRoles().contains("ROLE_HEAD")) {
//             Head head = new Head();
//             // Copy common attributes from User to Head
//             head.setName(user.getName());
//             head.setEmail(user.getEmail());
//             head.setPassword(user.getPassword());
//             head.setPhoto(user.getPhoto());
//             head.setRoles(user.getRoles());
//             // Set additional attributes for Head
//             head.setDept(user instanceof Head ? ((Head) user).getDept() : null);
//             // Save Head
//             return headRepository.save(head);
//         } else {
//             // Default to saving as User if no specific role
//             return userRepository.save(user);
//         }
//     }
// }
