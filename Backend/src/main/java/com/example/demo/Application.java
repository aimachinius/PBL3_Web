package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// import jakarta.persistence.EntityManager;
import com.example.demo.Service.FlightService;
import com.example.demo.Service.PlaneService;

import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application {
	// static public FlightRepo flightRepo;
	 private static ApplicationContext context;

	public static void main(String[] args) {
		context = SpringApplication.run(Application.class, args);

		FlightService flightService = context.getBean(FlightService.class);
		PlaneService planeService = context.getBean(PlaneService.class);

		flightService.deleteFlight(10);
		flightService.getAllFlight().forEach(System.out::println);
	}
	public static ApplicationContext getContext(){
		return context;
	}
}
