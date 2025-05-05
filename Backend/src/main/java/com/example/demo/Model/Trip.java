package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "Trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "departure_flight_id", nullable = false)
    private Flight departureFlight;

    @ManyToOne
    @JoinColumn(name = "return_flight_id")
    private Flight returnFlight;

    @Column(name = "booking_day", nullable = false)
    private Date bookingDay;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Flight getDepartureFlight() {
        return departureFlight;
    }

    public void setDepartureFlight(Flight departureFlight) {
        this.departureFlight = departureFlight;
    }

    public Flight getReturnFlight() {
        return returnFlight;
    }

    public void setReturnFlight(Flight returnFlight) {
        this.returnFlight = returnFlight;
    }

    public Date getBookingDay() {
        return bookingDay;
    }

    public void setBookingDay(Date bookingDay) {
        this.bookingDay = bookingDay;
    }


    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Trip trip)) return false;
        return id == trip.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", departureFlight=" + departureFlight +
                ", returnFlight=" + returnFlight +
                ", bookingDay=" + bookingDay +
                '}';
    }
}
