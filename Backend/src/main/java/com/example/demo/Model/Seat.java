package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enum.SeatType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Seat")
    private int idSeat;

    @Column(name = "Seat_Number")
    private String seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "Seat_Type")
    private SeatType seatType;

    @ManyToOne
    @JoinColumn(name = "Id_Plane")
    @JsonIgnore
    private Plane plane;

    public Seat() {
    }

    public Seat(int idSeat, String seatNumber, SeatType seatType, Plane plane) {
        this.idSeat = idSeat;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.plane = plane;
    }

    public Seat(String seatNumber, SeatType seatType, Plane plane) {

        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.plane = plane;
    }

    public int getKey() {
        return idSeat;
    }

    public List<String> valueString() {
        List<String> value = new ArrayList<>();
        value.add(seatNumber);
        value.add(seatType.toString());
        value.add(String.valueOf(plane != null ? plane.getIdPlane() : "null"));
        return value;
    }

    public int getIdSeat() {
        return idSeat;
    }

    public void setIdSeat(int idSeat) {
        this.idSeat = idSeat;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
    }

    public Plane getPlane() {
        return plane;
    }

    public void setPlane(Plane plane) {
        this.plane = plane;
    }

    @Override
    public String toString() {
        return "Seat{" +
                "idSeat=" + idSeat +
                ", seatNumber='" + seatNumber + '\'' +
                ", seatType='" + seatType + '\'' +
                ", plane=" + (plane != null ? plane.getIdPlane() : "null") +
                '}';
    }

    public void Copy(Seat seat) {
        this.seatNumber = seat.getSeatNumber();
        this.seatType = seat.getSeatType();
        this.plane = seat.getPlane();
    }
}
