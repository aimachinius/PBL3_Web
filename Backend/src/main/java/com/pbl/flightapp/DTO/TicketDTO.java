package com.pbl.flightapp.DTO;

import com.pbl.flightapp.Enum.TicketType;
import com.pbl.flightapp.Model.Ticket;

public class TicketDTO {
    private int idTicket;
    private UserDTO user;
    private FlightDTO flight;
    private TicketType ticketType;
    private String SeatName;
    private Long price;
    private int baggageId;
    private ReturnTicketDTO returnTicket;
    private int bookingId;
    private Long createdAt;

    public TicketDTO() {
    }
    public TicketDTO(Ticket ticket){
        this.idTicket = ticket.getIdTicket();
        this.user = new UserDTO(ticket.getUser());
        this.flight = new FlightDTO(ticket.getFlight());
        this.ticketType = ticket.getTicketType();
        if(ticket.getSeat()!=null){
            this.SeatName = ticket.getSeat().getSeatNumber();
        }
        this.price = ticket.getPrice();
        if(ticket.getBaggage()!=null){
            this.baggageId = ticket.getBaggage().getIdBaggage();
        }
        if(ticket.getReturnTicket()!=null){
            this.returnTicket = new ReturnTicketDTO(ticket.getReturnTicket());
        }
        this.createdAt = ticket.getCreatedAt().getTime();
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public ReturnTicketDTO getReturnTicket() {
        return returnTicket;
    }

    public void setReturnTicket(ReturnTicketDTO returnTicket) {
        this.returnTicket = returnTicket;
    }

    public int getBaggageId() {
        return baggageId;
    }

    public void setBaggageId(int baggageId) {
        this.baggageId = baggageId;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getSeatName() {
        return SeatName;
    }

    public void setSeatName(String seatName) {
        SeatName = seatName;
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }

    public FlightDTO getFlight() {
        return flight;
    }

    public void setFlight(FlightDTO flight) {
        this.flight = flight;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
    }
}
