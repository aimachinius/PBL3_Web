package com.pbl.flightapp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pbl.flightapp.Model.ReturnTicket;

@Repository
public interface ReturnTicketRepo extends JpaRepository<ReturnTicket, Integer> {
    List<ReturnTicket> findByFlight_IdFlight(Integer flightId);
}
