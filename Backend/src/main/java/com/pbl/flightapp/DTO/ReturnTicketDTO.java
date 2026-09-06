package com.pbl.flightapp.DTO;

import com.pbl.flightapp.Model.ReturnTicket;

public class ReturnTicketDTO {
    private int idReturnTicket;
    private int ticketId;
    private FlightDTO flight;
    private String ticketType;
    private String seatName;
    private Long price;
    private int baggageId;

    public ReturnTicketDTO() {
    }

    // public ReturnTicketDTO(int idReturnTicket, int ticketId, int flightId, String ticketType, 
    //                    int flightSeatId, int seatFlightId, Long price, int baggageId) {
    //     this.idReturnTicket = idReturnTicket;
    //     this.ticketId = ticketId;
    //     this.flightId = flightId;
    //     this.ticketType = ticketType;
    //     this.flightSeatId = flightSeatId;
    //     this.seatFlightId = seatFlightId;
    //     this.price = price;
    //     this.baggageId = baggageId;
    // }
    public ReturnTicketDTO(ReturnTicket returnTicket) {
        if(returnTicket!=null){
        this.idReturnTicket = returnTicket.getIdReturnTicket();
        this.ticketId = returnTicket.getTicket().getIdTicket();
        this.flight = new FlightDTO(returnTicket.getFlight());
        this.ticketType = returnTicket.getTicketType().name();
        this.price = returnTicket.getPrice();
        if(returnTicket.getSeat()!=null){
            this.seatName = returnTicket.getSeat().getSeatNumber();
        }
        if(returnTicket.getBaggage()!=null){
            this.baggageId = returnTicket.getBaggage().getIdBaggage();
        }
        }
    }

    public int getIdReturnTicket() {
        return idReturnTicket;
    }

    public void setIdReturnTicket(int idReturnTicket) {
        this.idReturnTicket = idReturnTicket;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public FlightDTO getFlight() {
        return flight;
    }

    public void setFlight(FlightDTO flight) {
        this.flight = flight;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public String getSeatName() {
        return seatName;
    }

    public void setSeatName(String seatName) {
        this.seatName = seatName;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public int getBaggageId() {
        return baggageId;
    }

    public void setBaggageId(int baggageId) {
        this.baggageId = baggageId;
    }
}
