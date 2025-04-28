package com.example.demo.Controller;

import com.example.demo.Model.Location;
import com.example.demo.Repository.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Shared")
@CrossOrigin(origins = "*")
public class SharedControler {
    @Autowired
    LocationRepo locationRepo;

    @GetMapping("/getAllLocation")
    public List<Location> getAllLocation() {
        List<Location> list = locationRepo.findAll();
        System.out.println("Số lượng Location: " + list.size());
        return list;
    }
}
