package com.tfg.gestionong.service;

import com.tfg.gestionong.model.News;
import java.util.List;

public interface NewsService {
    List<News> getAllNews();
    News saveNews(News news);
    void deleteNews(Long id);
}
