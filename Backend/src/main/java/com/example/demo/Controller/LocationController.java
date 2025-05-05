package com.example.demo.Controller;

import com.example.demo.Model.Flight;
import com.example.demo.Model.Location;
import com.example.demo.Repository.LocationRepo;
import com.example.demo.Service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/location")
public class LocationController {
    @Autowired
    LocationRepo locationRepo;

    @GetMapping("/all_location")
    public List<Location> allLocation() {
        List<Location> list = locationRepo.findAll();
        System.out.println("Số lượng Location: " + list.size());
        return list;
    }
}
