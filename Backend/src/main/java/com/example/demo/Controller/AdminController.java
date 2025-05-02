package com.example.demo.Controller;

import com.example.demo.Model.Plane;
import com.example.demo.Service.PlaneService;
import com.example.demo.Enum.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private PlaneService planeService;

    // Get all planes
    @GetMapping("/planes")
    public List<Plane> getAllPlanes() {
        return planeService.getAllPlane();
    }

    // Get plane by id
    @GetMapping("/planes/{id}")
    public Plane getPlaneById(@PathVariable int id) {
        return planeService.getPlaneById(id);
    }

    // Get planes by name
    @GetMapping("/planes/name/{name}")
    public List<Plane> getPlaneByName(@PathVariable String name) {
        return planeService.getPlaneByName(name);
    }

    // Get planes by seat count
    @GetMapping("/planes/seats/{count}")
    public List<Plane> getPlaneBySeatCount(@PathVariable int count) {
        return planeService.getPlaneBySeatCount(count);
    }

    // Create a new plane
    @PostMapping("/planes")
    public void addPlane(@RequestBody Plane plane) {
        planeService.addPlane(plane);
    }

    // Update a plane
    @PutMapping("/planes")
    public void updatePlane(@RequestBody Plane plane) {
        planeService.updatePlane(plane);
    }

    // Delete a plane by ID
    @DeleteMapping("/planes/{id}")
    public void deletePlane(@PathVariable int id) {
        planeService.deletePlane(id);
    }

    // Update only the status of a plane
    @PatchMapping("/planes/{id}/status")
    public void updatePlaneStatus(@PathVariable int id, @RequestParam Status status) {
        planeService.updatePlaneStatus(id, status);
    }
}
