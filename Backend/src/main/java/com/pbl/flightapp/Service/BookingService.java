package com.pbl.flightapp.Service;

import java.time.LocalTime;
import java.util.List;

import com.pbl.flightapp.Enum.UserType;
import com.pbl.flightapp.Repository.UserRepo;
import com.pbl.flightapp.appExc.NotFoundException;
import com.pbl.flightapp.appExc.UserException;
import com.pbl.flightapp.requestObj.BookingRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pbl.flightapp.DTO.BookingDTO;
import com.pbl.flightapp.Model.Booking;
import com.pbl.flightapp.Model.User;
import com.pbl.flightapp.Model.Ticket;
import com.pbl.flightapp.Repository.BookingRepo;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
public class BookingService {
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private TicketService ticketService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserService userService;

    // @Transactional
    // public Booking updateBooking(int id, BookingRequest bookingRequest) {
    // Booking booking = bookingRepo.findById(id).orElseThrow(() -> new
    // RuntimeException("Booking not found"));

    // List<Ticket> tickets = updateBooking.getTickets();
    // for(Ticket ticket : tickets) {
    // ticket.setBooking(booking);
    // }
    // booking.setPaymentMethod(updateBooking.getPaymentMethod());
    // return bookingRepo.save(booking);
    // }

    public List<Ticket> getTicketsByBookingId(int id) {
        Booking booking = bookingRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Booking not found", "BOOKING_NOT_FOUND"));
        return booking.getTickets();
    }

    // 予約を作成する
    @Transactional
    public Booking createBooking(BookingRequest bookingRequest) {
        if (bookingRequest.getTickets().isEmpty()) {
            throw new RuntimeException("Tickets are required");
        }

        Booking booking = new Booking();
        booking.setPaymentMethod(bookingRequest.getPaymentMethod());

        // Set the first customer as the booking customer
        User bookingUser = bookingRequest.getTickets().getFirst().getUser();

        bookingUser.setUserType(UserType.CUSTOMER);
        if(bookingUser.getEmail() == null || bookingUser.getEmail().isEmpty()) {
            throw new UserException("Email is required", "EMAIL_REQUIRED");
        }
        bookingUser = userService.createUpdateUser(bookingUser);

        booking.setUser(bookingUser);
        booking = bookingRepo.save(booking);

        List<Ticket> createdTickets = ticketService.addTickets(bookingRequest, booking);

        booking.setTickets(createdTickets);
        long totalPrice = 0;
        for (Ticket ticket : createdTickets) {
            totalPrice += ticket.getPrice();
            if(ticket.getReturnTicket() != null){
                totalPrice += ticket.getReturnTicket().getPrice();
            }
        }
        booking.setAmount(totalPrice);
        booking.setPaymentDate(Timestamp.valueOf(LocalDateTime.now()));
        return booking;
    }

    public Booking getBooking(int id) throws Exception {
        return bookingRepo.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public void deleteBooking(int id) {
        bookingRepo.deleteById(id);
    }

    public List<BookingDTO> findByCustomerId(int customerId) {
        return bookingRepo.findByCustomerId(customerId);
    }

    public List<BookingDTO> findByFromDate(LocalDate fromDate, LocalDate toDate) {
        Timestamp fromTimestamp = Timestamp.valueOf(fromDate.atStartOfDay());
        Timestamp toTimestamp = Timestamp.valueOf(toDate.atTime(LocalTime.MAX));
        return bookingRepo.findByFromDate(fromTimestamp, toTimestamp);
    }

}
