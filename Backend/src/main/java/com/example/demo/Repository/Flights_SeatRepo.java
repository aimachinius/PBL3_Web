package com.example.demo.Repository;

import com.example.demo.Model.Flights_Seat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.Model.Flight;
import com.example.demo.Model.Seat;

@Repository
public interface Flights_SeatRepo extends JpaRepository<Flights_Seat, Integer> {
//    // tìm đến đúng ghế của chuyến đó , xem trạng thái
//    @Query("SELECT fs FROM Flights_Seat fs WHERE fs.idFlight.id = :flightId AND fs.idSeat.id = :seatId")
//    Flights_Seat findByIdFlightAndIdSeat(@Param("flightId") int flightId, @Param("seatId") int seatId);
//
//    // đưa ra danh sách ghế + trạng thái của chuyến đó
//    @Query("SELECT fs FROM Flights_Seat fs WHERE fs.idFlight.id = :flightId")
//    List<Flights_Seat> findByIdFlight(@Param("flightId") int flightId);

}
