package com.example.demo.Service;

import com.example.demo.Model.Flight;
import com.example.demo.Model.Location;
import com.example.demo.Repository.FlightRepo;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FlightService {
    @Autowired
    private FlightRepo flightRepo;

    public FlightService(FlightRepo flightRepo) {
        this.flightRepo = flightRepo;
    }

    public FlightService() {
    }

    public List<Flight> getAllFlight() {
        return flightRepo.findAll();
    }

    public Flight getFlightById(int idFlight) {
        return flightRepo.findByIdFlight(idFlight);
    }

    // create , update , replace , delete
    public void deleteFlight(int idFlight) {
        flightRepo.deleteById(idFlight);
    }

    public void addFlight(Flight flight) {
        flightRepo.save(flight);
    }

    // nhận vào flight , tìm trong db, nếu có thì gán thông tin rồi save , không thì
    // update
    public void updateFlight(Flight flight) {
        if (flightRepo.existsById(flight.getIdFlight())) {
            Flight exist = flightRepo.findByIdFlight(flight.getIdFlight());
            exist.Copy(flight);
            flightRepo.save(exist);
        } else {
            addFlight(flight);
        }
    }

//    public List<Flight> getFlightByFromAndTo(String fromLocation, String toLocation) {
//        return flightRepo.findByFromLocationAndToLocation(fromLocation, toLocation);
//    }

    public List<Flight> getFlightByFromAndToAndDepartureDate(Location fromLocation, Location toLocation,
                                                             Date departureDate) {
        return flightRepo.findByFromLocationAndToLocationAndDepartureDate(fromLocation, toLocation, departureDate);
    }

}
