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
@RequestMapping("/shared")
@CrossOrigin(origins = "*")
public class SharedControler {
    @Autowired
    private FlightService flightService;

    @Autowired
    LocationRepo locationRepo;

    @CrossOrigin(origins = "*")
    @GetMapping("/find_flight_by_id/{idFlight}")
    public Flight findFlightById(@PathVariable int idFlight) {
        return flightService.getFlightById(idFlight);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/find_flight")
    public List<Flight> searchFlights(
            @RequestParam int fromLocationId,
            @RequestParam int toLocationId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate) {

        Location from = locationRepo.findById(fromLocationId).orElseThrow();
        Location to = locationRepo.findById(toLocationId).orElseThrow();
        return flightService.getFlightByFromAndToAndDepartureDate(from, to, java.sql.Date.valueOf(departureDate));
    }

    @GetMapping("/all_location")
    public List<Location> getAllLocation() {
        List<Location> list = locationRepo.findAll();
        System.out.println("Số lượng Location: " + list.size());
        return list;
    }
}
