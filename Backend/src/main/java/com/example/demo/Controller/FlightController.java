package com.example.demo.Controller;

import com.example.demo.Model.Flight;
import com.example.demo.Model.Location;
import com.example.demo.Model.Plane;
import com.example.demo.Repository.LocationRepo;
import com.example.demo.Service.FlightService;
import com.example.demo.Service.PlaneService;
import com.example.demo.Enum.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/flight")
public class FlightController {

    @Autowired
    private FlightService flightService;
    @Autowired
    LocationRepo locationRepo;
    ///
    // Thêm chuyến bay mới
    @PostMapping("")
    public void addFlight(@RequestBody Flight flight) {
        flightService.addFlight(flight);
    }
    // Cập nhật chuyến bay (nếu có thì update, không có thì tạo mới)
    @PutMapping("/{id}")
    public void updateFlight(@PathVariable int id, @RequestBody Flight flight) {
        flight.setIdFlight(id);
        flightService.updateFlight(flight);
    }
    // Xoá chuyến bay
    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable int id) {
        flightService.deleteFlight(id);
    }

    @GetMapping("/{idFlight}")
    public Flight findFlightById(@PathVariable int idFlight) {
        return flightService.getFlightById(idFlight);
    }

    @GetMapping("/find_flight")
    public List<Flight> searchFlights(
            @RequestParam int fromLocationId,
            @RequestParam int toLocationId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate) {

        Location from = locationRepo.findById(fromLocationId).orElseThrow();
        Location to = locationRepo.findById(toLocationId).orElseThrow();
        return flightService.getFlightByFromAndToAndDepartureDate(from, to, java.sql.Date.valueOf(departureDate));
    }
    // Lấy toàn bộ chuyến bay
    @GetMapping("/all_flights")
    public List<Flight> allFlights() {
        return flightService.getAllFlight();
    }
}
