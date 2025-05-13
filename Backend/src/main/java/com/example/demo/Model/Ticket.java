package com.example.demo.Model;

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
    @JoinColumn(name = "id_customer", referencedColumnName = "id_customer", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "trip_id", referencedColumnName = "id_trip", nullable = false)
    private Trip trip;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "departure_flight_id", referencedColumnName = "id_flight"),
            @JoinColumn(name = "departure_id_seat", referencedColumnName = "id_seat")
    })
    private Flights_Seat departureSeat;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "return_flight_id", referencedColumnName = "id_flight"),
            @JoinColumn(name = "return_id_seat", referencedColumnName = "id_seat")
    })

    private Flights_Seat returnSeat;

    @Column(name = "price")
    private Long price;

    @OneToOne
    @JoinColumn(name = "Id_Baggage", referencedColumnName = "Id_Baggage")
    private Baggage baggage;

    @ManyToOne
    @JoinColumn(name = "id_booking", referencedColumnName = "booking_id", nullable = false)
    private Booking booking;

    private Timestamp createdAt;

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public Flights_Seat getDepartureSeat() {
        return departureSeat;
    }

    public void setDepartureSeat(Flights_Seat departureSeat) {
        this.departureSeat = departureSeat;
    }

    public Flights_Seat getReturnSeat() {
        return returnSeat;
    }

    public void setReturnSeat(Flights_Seat returnSeat) {
        this.returnSeat = returnSeat;
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

    @Override
    public String toString() {
        return "Ticket{" +
                "idTicket=" + idTicket +
                ", customer=" + customer +
                ", trip=" + trip +
                ", departureSeat=" + departureSeat +
                ", returnSeat=" + returnSeat +
                ", price=" + price +
                ", baggage=" + baggage +
                ", createdAt=" + createdAt +
                '}';
    }
}
