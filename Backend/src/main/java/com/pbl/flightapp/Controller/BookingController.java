package com.pbl.flightapp.Controller;

import com.pbl.flightapp.Model.Booking;
import com.pbl.flightapp.Model.Ticket;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pbl.flightapp.Service.BookingService;
import com.pbl.flightapp.Service.UserService;

import com.pbl.flightapp.Model.User;
import com.pbl.flightapp.requestObj.BookingRequest;
import com.pbl.flightapp.DTO.BookingDTO;
import com.pbl.flightapp.DTO.FlightDTO;
import com.pbl.flightapp.DTO.TicketDTO;
import com.pbl.flightapp.DTO.UserDTO;

import java.util.ArrayList;
import java.util.HashMap;


import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserService userService;

    // @PutMapping("/{id}")
    // public Booking updateBooking(@PathVariable int id, @RequestBody
    // BookingRequest bookingRequest) {
    // return bookingService.updateBooking(id, bookingRequest);
    // }
    // 予約を作成する
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        bookingService.createBooking(request);
        return ResponseEntity.ok("Booking created successfully");
    }

    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable int id) {
        try {
            return bookingService.getBooking(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable int id) {
        bookingService.deleteBooking(id);
    }

    @GetMapping("findByCustomerId/{customerId}")
    public List<BookingDTO> findByCustomerId(@PathVariable int customerId) {
        return bookingService.findByCustomerId(customerId);
    }

    @GetMapping("/findByCustomerInformation")
    public List<BookingDTO> findByCustomerInformation(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String cardNumber) {
        if (email != null && email.isEmpty()) {
            email = null;
        }
        if (phone != null && phone.isEmpty()) {
            phone = null;
        }
        if (cardNumber != null && cardNumber.isEmpty()) {
            cardNumber = null;
        }
        User user = userService.findByCustomerInformation(email, phone, cardNumber);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return bookingService.findByCustomerId(user.getIdUser());
    }

    @GetMapping("/fromDate/{fromDate}/toDate/{toDate}")
    public List<BookingDTO> findByFromDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {
        return bookingService.findByFromDate(fromDate, toDate);
    }

    /*
     * 
     * deparuteFlight
     * returnFlight
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    @GetMapping("/{id}/tickets")
    public List<TicketDTO> getTicketsByBookingId(@PathVariable int id) {
        List<TicketDTO> ticketList = new ArrayList<>();
        List<Ticket> tickets = bookingService.getTicketsByBookingId(id);
        for (Ticket ticket : tickets) {
            ticketList.add(new TicketDTO(ticket));
        }
        return ticketList;
    }

}