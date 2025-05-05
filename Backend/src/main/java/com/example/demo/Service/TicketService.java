package com.example.demo.Service;

import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.TicketRepo;
import com.example.demo.Model.Baggage;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Flight;
import com.example.demo.Model.Seat;
import com.example.demo.Model.Ticket;

@Service
public class TicketService {
//    @Autowired
//    private TicketRepo ticketRepo;
//
//    public TicketService() {
//    }
//
//    public TicketService(TicketRepo ticketRepo) {
//        this.ticketRepo = ticketRepo;
//    }
//
//    public List<Ticket> getAllTicket() {
//        return ticketRepo.findAll();
//    }
//
//    public Ticket getTicketByIdTicket(int idTicket) {
//        return ticketRepo.findByIdTicket(idTicket);
//    }
//
//    public List<Ticket> getTicketByIdFlight(Flight flight) {
//        return ticketRepo.findByFlight(flight);
//    }
//
//    public List<Ticket> getTicketByIdCard(Customer customerId) {
//        return ticketRepo.findByCustomer(customerId);
//    }
//
//    public List<Ticket> getTicketByIdSeat(Seat seatId) {
//        return ticketRepo.findBySeat(seatId);
//    }
//
//    public List<Ticket> getTicketByIdFlightReturn(Flight flightReturnId) {
//        return ticketRepo.findByFlightReturn(flightReturnId);
//    }
//
//    public List<Ticket> getTicketByIdReturnFlightSeat(Seat returnFlightSeatId) {
//        return ticketRepo.findByReturnFlightSeat(returnFlightSeatId);
//    }
//
//    public List<Ticket> getTicketByBookingDay(Date bookingDay) {
//        return ticketRepo.findByBookingDay(bookingDay);
//    }
//
//    public List<Ticket> getTicketByIdBaggage(Baggage idBaggage) {
//        return ticketRepo.findByBaggage(idBaggage);
//    }
//
//    public void deleteTicket(int idTicket) {
//        ticketRepo.deleteById(idTicket);
//    }

//    public void addTicket(Ticket ticket) {
//        // add customer , flight_seat, baggage,
//        if (!ticketRepo.existsById(ticket.getIdTicket())) {
//            CustomerService customerService = new CustomerService();
//            customerService.addCustomer(ticket.getCustomer());
//            Flights_SeatService flight_seatService = new Flights_SeatService();
//            flight_seatService.addFlight_Seat(ticket.getFlight(), ticket.getSeat());
//            BaggageService baggageService = new BaggageService();
//            baggageService.addBaggage(ticket.getBaggage());
//            ticketRepo.save(ticket);
//        }
//    }

//    public void updateTicket(Ticket ticket) {
//        if (ticketRepo.existsById(ticket.getIdTicket())) {
//            Ticket exist = ticketRepo.findByIdTicket(ticket.getIdTicket());
//            exist.Copy(ticket);
//            ticketRepo.save(exist);
//        } else {
//            addTicket(ticket);
//        }
//    }

}
