package com.tfg.gestionong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class GestionOngApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionOngApplication.class, args);
    }

}
