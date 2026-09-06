package com.pbl.flightapp.Model;

import com.pbl.flightapp.Enum.TicketType;
import jakarta.persistence.*;

@Entity
@Table(name = "ReturnTicket")
public class ReturnTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idReturnTicket;

    @OneToOne
    @JoinColumn(name = "id_ticket", nullable = false)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(name = "ticket_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "flight_seat_id", referencedColumnName = "id_flight"),
            @JoinColumn(name = "seat_flight_id", referencedColumnName = "id_seat")
    })
    private Flights_Seat seat;

    @Column(name = "price")
    private Long price;

    @OneToOne
    @JoinColumn(name = "Id_Baggage", referencedColumnName = "Id_Baggage")
    private Baggage baggage;

    public ReturnTicket() {
    }

    public ReturnTicket( Ticket ticket, Flight flight, TicketType ticketType, Flights_Seat seat) {
     
        this.ticket = ticket;
        this.flight = flight;
        this.ticketType = ticketType;
        this.seat = seat;
    }

    public int getIdReturnTicket() {
        return idReturnTicket;
    }

    public void setIdReturnTicket(int idReturnTicket) {
        this.idReturnTicket = idReturnTicket;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Flights_Seat getSeat() {
        return seat;
    }

    public void setSeat(Flights_Seat seat) {
        this.seat = seat;
    }

    public Baggage getBaggage() {
        return baggage;
    }

    public void setBaggage(Baggage baggage) {
        this.baggage = baggage;
    }
}