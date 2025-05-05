package com.example.demo.Model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.example.demo.Enum.SeatStatus;

@Entity
@Table(name = "Flights_Seat")
@IdClass(Flights_Seat_Id.class)
public class Flights_Seat {

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Flight")
    private Flight flight;

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Seat")
    private Seat seat;

    @Column(name = "Seat_Status")
    private SeatStatus seatStatus;

    public Flights_Seat() {
    }

    public Flights_Seat(Flight flight, Seat seat, SeatStatus seatStatus) {
        this.flight = flight;
        this.seat = seat;
        this.seatStatus = seatStatus;
    }

    public Flights_Seat(Flight flight, Seat seat) {
        this.flight = flight;
        this.seat = seat;
        // this.seatStatus = seatStatus;
    }

    public Flight getKey() {
        return flight;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public SeatStatus getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(SeatStatus seatStatus) {
        this.seatStatus = seatStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Flights_Seat))
            return false;
        Flights_Seat that = (Flights_Seat) o;
        return Objects.equals(flight, that.flight) &&
                Objects.equals(seat, that.seat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(flight, seat);
    }

    @Override
    public String toString() {
        return "Flights_Seat{" +
                "flight=" + flight +
                ", seat=" + seat +
                ", seatStatus='" + seatStatus + '\'' +
                '}';
    }
}
