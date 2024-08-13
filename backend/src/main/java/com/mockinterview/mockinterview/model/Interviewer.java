package com.mockinterview.mockinterview.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Interviewer extends User {

    private String photo;
    @JsonIgnore
    @OneToMany(mappedBy = "interviewer")
    private List<Interview> interviews;
}
