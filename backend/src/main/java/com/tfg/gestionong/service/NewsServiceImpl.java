package com.tfg.gestionong.service;

import com.tfg.gestionong.model.News;
import com.tfg.gestionong.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Override
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    @Override
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }
}
