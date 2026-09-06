package com.pbl.flightapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.pbl.flightapp.Model.Booking;
import com.pbl.flightapp.DTO.BookingDTO;

import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;


@Repository
public interface BookingRepo extends JpaRepository<Booking, Integer> {
    @Query("SELECT new com.pbl.flightapp.DTO.BookingDTO(b) FROM Booking b WHERE b.customer.id = :customerId")
    List<BookingDTO> findByCustomerId(@Param("customerId") int customerId);

    @Query("SELECT new com.pbl.flightapp.DTO.BookingDTO(b) " +
            "FROM Booking b WHERE b.paymentDate BETWEEN :fromDate AND :toDate")
    List<BookingDTO> findByFromDate(@Param("fromDate") Timestamp fromDate,
                                    @Param("toDate") Timestamp toDate);


}
