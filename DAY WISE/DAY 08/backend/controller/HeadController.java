package com.mockinterview.backend.controller;

import com.mockinterview.backend.model.Head;
import com.mockinterview.backend.service.HeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/heads")
public class HeadController {

    @Autowired
    private HeadService headService;

    // Add a new Head
    @PostMapping
    public ResponseEntity<Head> addHead(@RequestBody Head head) {
        Head createdHead = headService.addHead(head);
        return ResponseEntity.ok(createdHead);
    }

    // Update an existing Head
    @PutMapping("/{email}")
    public ResponseEntity<Head> updateHead(@PathVariable String email, @RequestBody Head headDetails) {
        Head updatedHead = headService.updateHead(email, headDetails);
        if (updatedHead != null) {
            return ResponseEntity.ok(updatedHead);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Head by email
    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteHead(@PathVariable String email) {
        headService.deleteHead(email);
        return ResponseEntity.noContent().build();
    }

    // Get a Head by email
    @GetMapping("/{email}")
    public ResponseEntity<Head> getHeadByEmail(@PathVariable String email) {
        Head head = headService.getHeadByEmail(email);
        if (head != null) {
            return ResponseEntity.ok(head);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all Heads
    @GetMapping
    public ResponseEntity<List<Head>> getAllHeads() {
        List<Head> heads = headService.getAllHeads();
        return ResponseEntity.ok(heads);
    }

    // Get overall ratings for a specific section
    @GetMapping("/ratings/section/{section}")
    public ResponseEntity<Double> getOverallRatingBySection(@PathVariable String section) {
        double rating = headService.getOverallRatingBySection(section);
        return ResponseEntity.ok(rating);
    }

    // Get overall ratings for a specific class
    @GetMapping("/ratings/class/{classBeingMentored}")
    public ResponseEntity<Double> getOverallRatingByClass(@PathVariable String classBeingMentored) {
        double rating = headService.getOverallRatingByClass(classBeingMentored);
        return ResponseEntity.ok(rating);
    }

    // Get overall ratings for a specific department
    @GetMapping("/ratings/department/{department}")
    public ResponseEntity<Double> getOverallRatingByDepartment(@PathVariable String department) {
        double rating = headService.getOverallRatingByDepartment(department);
        return ResponseEntity.ok(rating);
    }

    // Get overall ratings for a specific batch
    @GetMapping("/ratings/batch/{batch}")
    public ResponseEntity<Double> getOverallRatingByBatch(@PathVariable String batch) {
        double rating = headService.getOverallRatingByBatch(batch);
        return ResponseEntity.ok(rating);
    }

    // Get statistics for a specific batch, department, and section
    @GetMapping("/stats/{batch}/{dept}/{section}")
    public ResponseEntity<HeadService.BatchDeptSectionStats> getBatchDeptSectionStats(
            @PathVariable String batch,
            @PathVariable String dept,
            @PathVariable String section) {
        HeadService.BatchDeptSectionStats stats = headService.getBatchDeptSectionStats(batch, dept, section);
        return ResponseEntity.ok(stats);
    }
}
