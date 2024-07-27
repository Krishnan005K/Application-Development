package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Repository.AdminRepository;
import com.app.exception.DuplicateEmailException;
import com.app.models.Admin;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

  public Admin saveAdmin(Admin admin) {
    if (adminRepository.findByUsername(admin.getEmailid()).isPresent()) {
        throw new DuplicateEmailException("Email already exists");
    }
    return adminRepository.save(admin);
}

    public Optional<Admin> findAdminById(String id) {
        return adminRepository.findById(id);
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }

    public Optional<Admin> findByUsernameAndPassword(String email, String password) {
        return adminRepository.findByUsernameAndPassword(email, password);
    }

    public int updatePassword(String password, String username) {
        return adminRepository.updatePassword(password, username);
    }
}
