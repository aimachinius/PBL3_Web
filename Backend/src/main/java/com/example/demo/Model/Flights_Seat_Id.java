package com.example.demo.Model;

import java.io.Serializable;
import java.util.Objects;

public class Flights_Seat_Id implements Serializable {
    private int flight;
    private int seat;

    // Default constructor
    public Flights_Seat_Id() {}

    public Flights_Seat_Id(int flight, int seat) {
        this.flight = flight;
        this.seat = seat;
    }

    // equals() và hashCode() là bắt buộc khi dùng @IdClass
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Flights_Seat_Id)) return false;
        Flights_Seat_Id that = (Flights_Seat_Id) o;
        return Objects.equals(flight, that.flight) && Objects.equals(seat, that.seat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(flight, seat);
    }

    // getters/setters
}
