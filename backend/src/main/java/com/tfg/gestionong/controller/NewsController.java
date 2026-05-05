package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.News;
import com.tfg.gestionong.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/noticias")
@CrossOrigin(origins = "http://localhost:4200")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<News> getAllNews() {
        System.out.println("DEBUG - Petición GET recibida en /noticias");
        List<News> data = newsService.getAllNews();
        System.out.println("DEBUG - Enviando " + data.size() + " noticias");
        return data;
    }

    @PostMapping
    public News createNews(@RequestBody News news) {
        System.out.println("DEBUG - Petición POST recibida en /noticias");
        return newsService.saveNews(news);
    }

    @PutMapping("/{id}")
    public News updateNews(@PathVariable Long id, @RequestBody News news) {
        news.setId(id);
        return newsService.saveNews(news);
    }

    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }
}
