// Admin.java
package com.mockinterview.mockinterview.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Admin extends User{
    // Additional fields specific to Admin if needed
    private String photo;
}
