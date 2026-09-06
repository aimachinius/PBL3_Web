package com.pbl.flightapp.requestObj;

import java.util.List;

import com.pbl.flightapp.Enum.PaymentMethod;
import com.pbl.flightapp.Enum.TicketType;

public class BookingRequest {
    private PaymentMethod paymentMethod;
    private List<TicketRequest> tickets;
    private Integer departureFlightId, returnFlightId;
    private TicketType departureTicketType, returnTicketType;

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public List<TicketRequest> getTickets() {
        return tickets;
    }

    public void setTickets(List<TicketRequest> tickets) {
        this.tickets = tickets;
    }

    public TicketType getDepartureTicketType() {
        return departureTicketType;
    }

    public void setDepartureTicketType(TicketType departureTicketType) {
        this.departureTicketType = departureTicketType;
    }

    public TicketType getReturnTicketType() {
        return returnTicketType;
    }

    public void setReturnTicketType(TicketType returnTicketType) {
        this.returnTicketType = returnTicketType;
    }

    public Integer getDepartureFlightId() {
        return departureFlightId;
    }

    public void setDepartureFlightId(Integer departureFlightId) {
        this.departureFlightId = departureFlightId;
    }

    public void setReturnFlightId(Integer returnFlightId) {
        this.returnFlightId = returnFlightId;
    }

    public Integer getReturnFlightId() {
        return returnFlightId;
    }
}
