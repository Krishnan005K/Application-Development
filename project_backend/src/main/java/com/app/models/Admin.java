package com.app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Length;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Admin extends AdminBaseEntity {
    @Column(length = 30)
    @NotEmpty(message ="Password cannot be blank")
    @Length(min = 4, max = 30, message = "Invalid password length!!!!")    
    private String password;

    @NotEmpty(message ="Name can't be blank")
    @Length(min = 3, max = 45, message = "Invalid Name length!!!!")
    @Column(length = 45)
    private String name;

    @Column(length = 30)
    @Email(message = "Invalid email format!!!!")
    @NotEmpty(message = "Email cannot be blank")
    private String emailid;
}
