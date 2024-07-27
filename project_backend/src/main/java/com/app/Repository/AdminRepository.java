package com.app.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.Admin;


public interface AdminRepository extends JpaRepository<Admin,String> {
	Optional<Admin>  findByUsernameAndPassword(String email,String pwd);

     Optional<Admin> findByUsername(String email);
	 @Modifying
     @Query(value = "UPDATE Admin Set password=:pw WHERE username = :id")
     int updatePassword(@Param("pw") String password, @Param("id") String username);
}
