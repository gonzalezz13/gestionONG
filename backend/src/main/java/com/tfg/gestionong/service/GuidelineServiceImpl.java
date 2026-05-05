package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Guideline;
import com.tfg.gestionong.repository.GuidelineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuidelineServiceImpl implements GuidelineService {

    @Autowired
    private GuidelineRepository guidelineRepository;

    @Override
    public List<Guideline> getAllGuidelines() {
        return guidelineRepository.findAll();
    }

    @Override
    public Guideline saveGuideline(Guideline guideline) {
        return guidelineRepository.save(guideline);
    }

    @Override
    public void deleteGuideline(Long id) {
        guidelineRepository.deleteById(id);
    }
}
