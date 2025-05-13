package com.example.demo.Repository;

import com.example.demo.Model.Seat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.Model.Plane;

/*
 *  Id_Seat string [primary key]
  Seat_Number string
  Seat_Type enum('VIP','Common')
 */
@Repository
public interface SeatRepo extends JpaRepository<Seat, Integer> {
    Seat findByIdSeat(int idSeat);

    @Query("SELECT s FROM Seat s WHERE s.plane.idPlane = ?1")
    List<Seat> findByPlane(int idPlane);


    List<Seat> findBySeatType(String seatType);

}
