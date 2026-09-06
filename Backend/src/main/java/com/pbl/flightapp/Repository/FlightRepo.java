package com.pbl.flightapp.Repository;

import java.sql.Date;
import java.util.List;

import com.pbl.flightapp.Model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pbl.flightapp.DTO.FlightDTO;
import com.pbl.flightapp.Model.Flight;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Integer> {
    Flight findByIdFlight(int idFlight);

    // List<Flight> findByFromLocationAndToLocation(Location fromLocation, Location
    // toLocation);

    List<Flight> findByFromLocationAndToLocationAndDepartureDate(Location fromLocation, Location toLocation,
            Date departureDate);

    // @Query("SELECT new com.pbl.flightapp.DTO.FlightDTO(f.idFlight, 0,
    // f.departureDate, f.departureTime, f.durationMinutes, f.commonFare, f.vipFare,
    // f.fromLocation.id, f.toLocation.id, f.createdAt,
    // f.bookedEconomyCustomerNumber, f.bookedVipCustomerNumber, f.economySeats,
    // f.vipSeats) FROM Flight f WHERE f.fromLocation = :fromLocation AND
    // f.toLocation = :toLocation AND f.departureDate = :departureDate")
    // List<FlightDTO> getFlightDTO(Location fromLocation, Location toLocation,
    // Date departureDate);
    List<Flight> findByPlaneIdPlane(int planeId);

}

/*
 * a1 b1
 * a2 b2
 * a1 < b2 <b1
 *  a1 <  a2 <b1
 * a1 <  a2 b2 <b1
 * 
 */