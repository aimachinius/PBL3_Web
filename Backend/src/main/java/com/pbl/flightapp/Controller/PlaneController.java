package com.pbl.flightapp.Controller;

import com.pbl.flightapp.Enum.Status;
import com.pbl.flightapp.Model.Flight;
import com.pbl.flightapp.Model.Location;
import com.pbl.flightapp.Model.Plane;
import com.pbl.flightapp.Repository.LocationRepo;
import com.pbl.flightapp.Service.FlightService;
import com.pbl.flightapp.Service.PlaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/plane")
public class PlaneController {
    @Autowired
    private PlaneService planeService;
    
    // Get all planes
    @GetMapping("/all_plane")
    @PreAuthorize("hasPermission(null, 'VIEW_MAY_BAY')")
    public List<Plane> getAllPlanes() {
        return  planeService.getAllPlane();

    }

    // Get plane by id
    @GetMapping("/{id}")
    public Plane getPlaneById(@PathVariable int id) {
        return planeService.getPlaneById(id);
    }

//    // Get planes by name
//    @GetMapping("/name/{name}")
//    public List<Plane> getPlaneByName(@PathVariable String name) {
//        return planeService.getPlaneByName(name);
//    }

    // Get planes by seat count
//    @GetMapping("/seats/{count}")
//    public List<Plane> getPlaneBySeatCount(@PathVariable int count) {
//        return planeService.getPlaneBySeatCount(count);
//    }

    // Create a new plane
    @PostMapping("")
    @PreAuthorize("hasPermission(null, 'EDIT_MAY_BAY')")
    public void addPlane(@RequestBody Plane plane) {
        planeService.addPlane(plane);
    }

    // Update a plane
    @PutMapping("")
    @PreAuthorize("hasPermission(null, 'EDIT_MAY_BAY')")
    public void updatePlane(@RequestBody Plane plane) {
        planeService.updatePlane(plane.getIdPlane(), plane);
    }

    // Delete a plane by ID
    @DeleteMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_MAY_BAY')")
    public void deletePlane(@PathVariable int id) {
        planeService.deletePlane(id);
    }

    // Update only the status of a plane
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasPermission(null, 'EDIT_MAY_BAY')")
    public void updatePlaneStatus(@PathVariable int id, @RequestParam Status status) {
        planeService.updatePlaneStatus(id, status);
    }
}
