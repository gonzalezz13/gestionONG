package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Guideline;
import java.util.List;

public interface GuidelineService {
    List<Guideline> getAllGuidelines();
    Guideline saveGuideline(Guideline guideline);
    void deleteGuideline(Long id);
}
