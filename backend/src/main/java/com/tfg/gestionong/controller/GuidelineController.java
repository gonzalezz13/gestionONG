package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.Guideline;
import com.tfg.gestionong.service.GuidelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/directrices")
@CrossOrigin(origins = "http://localhost:4200")
public class GuidelineController {

    @Autowired
    private GuidelineService guidelineService;

    @GetMapping
    public List<Guideline> getAllGuidelines() {
        List<Guideline> data = guidelineService.getAllGuidelines();
        System.out.println("DEBUG - Enviando " + data.size() + " directrices desde la base de datos");
        return data;
    }

    @PostMapping
    public Guideline createGuideline(@RequestBody Guideline guideline) {
        return guidelineService.saveGuideline(guideline);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGuideline(@PathVariable Long id) {
        guidelineService.deleteGuideline(id);
        return ResponseEntity.ok().build();
    }
}
