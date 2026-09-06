package com.pbl.flightapp.Repository;

import com.pbl.flightapp.DTO.FlightSeatDTO;
import com.pbl.flightapp.Model.Flights_Seat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.pbl.flightapp.Model.Flight;
import com.pbl.flightapp.Model.Seat;

@Repository
public interface Flights_SeatRepo extends JpaRepository<Flights_Seat, Integer> {
//    // tìm đến đúng ghế của chuyến đó , xem trạng thái
//    @Query("SELECT fs FROM Flights_Seat fs WHERE fs.idFlight.id = :flightId AND fs.idSeat.id = :seatId")
//    Flights_Seat findByIdFlightAndIdSeat(@Param("flightId") int flightId, @Param("seatId") int seatId);
//
//    // đưa ra danh sách ghế + trạng thái của chuyến đó

    @Query("SELECT new com.pbl.flightapp.DTO.FlightSeatDTO(fs.seat, fs.seatStatus) " +
            "FROM Flights_Seat fs WHERE fs.flight.id = :flightId")
    List<FlightSeatDTO> findFlightSeatsByFlightId(@Param("flightId") int flightId);

    @Query("SELECT fs FROM Flights_Seat fs WHERE fs.flight.id = :flightId AND fs.seat.seatNumber = :seatNumber")
    Flights_Seat findByIdFlightAndIdSeat(@Param("flightId") int flightId, @Param("seatNumber") String seatNumber);
}
