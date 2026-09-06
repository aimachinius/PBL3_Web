package com.pbl.flightapp.Model;

import com.pbl.flightapp.Enum.TicketType;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idTicket")
@Table(name = "Ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTicket;

    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false)
    private User user;

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
    
    @OneToOne(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private ReturnTicket returnTicket;

    @ManyToOne
    @JoinColumn(name = "id_booking", referencedColumnName = "booking_id", nullable = false)
    private Booking booking;
    
    private Timestamp createdAt;

    public Ticket() {
    }

    public Ticket(User user, Flight flight, TicketType ticketType, Flights_Seat seat, ReturnTicket returnTicket) {
        this.user = user;
        this.flight = flight;
        this.ticketType = ticketType;
        this.seat = seat;
        this.returnTicket = returnTicket;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Flights_Seat getSeat() {
        return seat;
    }

    public void setSeat(Flights_Seat seat) {
        this.seat = seat;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Baggage getBaggage() {
        return baggage;
    }

    public void setBaggage(Baggage baggage) {
        this.baggage = baggage;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Ticket ticket))
            return false;
        return idTicket == ticket.idTicket;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(idTicket);
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public ReturnTicket getReturnTicket() {
        return returnTicket;
    }

    public void setReturnTicket(ReturnTicket returnTicket) {
        this.returnTicket = returnTicket;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "idTicket=" + idTicket +
                ", user=" + user +
                ", seat=" + seat +
                ", price=" + price +
                ", baggage=" + baggage +
                ", createdAt=" + createdAt +
                '}';
    }
}
