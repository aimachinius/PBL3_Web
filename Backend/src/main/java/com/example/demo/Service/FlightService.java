package com.example.demo.Service;

import com.example.demo.Enum.SeatStatus;
import com.example.demo.Model.*;
import com.example.demo.Repository.FlightRepo;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Repository.PlaneRepo;
import com.example.demo.Repository.SeatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FlightService {
    @Autowired
    private FlightRepo flightRepo;
    @Autowired
    private SeatRepo seatRepo;
    @Autowired
    private PlaneRepo planeRepo;

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
        // Lấy tất cả ghế từ máy bay đã tồn tại


        List<Seat> seats = seatRepo.findByPlane(flight.getPlane().getIdPlane());

        // Tạo danh sách các Flights_Seat và liên kết với chuyến bay
        List<Flights_Seat> flightSeats = new ArrayList<>();
        for (Seat seat : seats) {
            flightSeats.add(new Flights_Seat(flight, seat, SeatStatus.NOT_BOOKED));
        }

        // Cập nhật danh sách Flights_Seat vào chuyến bay
        flight.setFlightsSeatList(flightSeats);

        // Lưu chuyến bay và các Flights_Seat (các đối tượng Seat đã tồn tại trong DB)
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
