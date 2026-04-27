package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Activity;
import com.tfg.gestionong.repository.ActivityRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class ActivityTask {

    private final ActivityRepository repository;

    public ActivityTask(ActivityRepository repository) {
        this.repository = repository;
    }

    @Scheduled(fixedRate = 60000)
    public void actualizarTareasVencidas() {
        System.out.println("Buscando tareas vencidas para finalizar...");

        LocalDateTime ahora = LocalDateTime.now();

        List<Activity> todas = repository.findAll();

        for (Activity actividad : todas) {
            if (actividad.getActivityDate().isBefore(ahora) &&
                    actividad.getStatus() == Activity.Status.programada) {

                actividad.setStatus(Activity.Status.finalizada);
                repository.save(actividad);
                System.out.println("Tarea finalizada automáticamente: " + actividad.getTitle());
            }
        }
    }
}