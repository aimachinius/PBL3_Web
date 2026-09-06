package com.pbl.flightapp.Model;

import jakarta.persistence.*;
import com.pbl.flightapp.Enum.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Plane")
public class Plane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Plane")
    private int idPlane;
    @Column(name = "Name_Plane")
    private String namePlane;
    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private Status status;
    @Column(name = "Flight_Hours")
    private int flightHours;

    @Transient
    private int seatCount;

    @OneToMany(mappedBy = "plane", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Seat> seats = new ArrayList<>();

    @OneToMany(mappedBy = "plane", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Flight> flights;

    public Plane() {
    }

    public Plane(String namePlane, Status status, int flightHours, int seatCount) {
        this.namePlane = namePlane;
        this.status = status;
        this.flightHours = flightHours;
    }

    public Plane(int idPlane, String namePlane, Status status, int flightHours, int seatCount) {
        this.idPlane = idPlane;
        this.namePlane = namePlane;
        this.status = status;
        this.flightHours = flightHours;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
        if (seats != null) {
            for (Seat seat : seats) {
                seat.setPlane(this);  // Gán ngược Plane cho từng Seat
            }
        }
    }

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }

    public int getKey() {
        return idPlane;
    }

    public List<String> valueString() {
        List<String> value = new ArrayList<>();
        value.add(namePlane);
        value.add(status.toString());
        value.add(String.valueOf(flightHours));
        return value;
    }

    public int getIdPlane() {
        return idPlane;
    }

    public void setIdPlane(int idPlane) {
        this.idPlane = idPlane;
    }

    public String getNamePlane() {
        return namePlane;
    }

    public void setNamePlane(String namePlane) {
        this.namePlane = namePlane;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getFlightHours() {
        return flightHours;
    }

    public void setFlightHours(int flightHours) {
        this.flightHours = flightHours;
    }

    public void CopyFrom(Plane plane) {
        this.namePlane = plane.namePlane;
        this.status = plane.status;
        this.flightHours = plane.flightHours;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    @Override
    public String toString() {
        return "Plane{" +
                "idPlane=" + idPlane +
                ", namePlane='" + namePlane + '\'' +
                ", status=" + status +
                ", flightHours=" + flightHours +
                '}';
    }
}
