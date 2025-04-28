package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Flight")
    private int idFlight;

    @ManyToOne
    @JoinColumn(name = "Id_Plane",referencedColumnName = "Id_Plane",nullable = false)
    private Plane plane;

    @Column(name = "Current_Seat")
    private int currentSeat;
    // Dùng Timestamp thay cho chuỗi ngày/giờ
    @Column(name = "Departure_Date")
    private Date departureDate;
    @Column(name = "Departure_Time")
    private Time departureTime;
    @Column(name = "Arrival_Date")
    private Date arrivalDate;
    @Column(name = "Estimated_Arrival_Time")
    private Time estimatedArrivalTime;

    @ManyToOne
    @JoinColumn(name = "F_R_O_M",referencedColumnName = "id",nullable = false)
    private Location fromLocation;

    @ManyToOne
    @JoinColumn(name = "T_O",referencedColumnName = "id",nullable = false)
    private Location toLocation;

    private Timestamp createdAt;

    public Flight() {
    }

    public Flight(Plane plane, int currentSeat, Date departureDate, Time departureTime,
            Date arrivalDate, Time estimatedArrivalTime, Location fromLocation, Location toLocation) {
        this.plane = plane;
        this.currentSeat = currentSeat;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.arrivalDate = arrivalDate;
        this.estimatedArrivalTime = estimatedArrivalTime;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public Flight(int idFlight, Plane plane, int currentSeat, Date departureDate, Time departureTime,
            Date arrivalDate, Time estimatedArrivalTime, Location fromLocation, Location toLocation) {
        this.idFlight = idFlight;
        this.plane = plane;
        this.currentSeat = currentSeat;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.arrivalDate = arrivalDate;
        this.estimatedArrivalTime = estimatedArrivalTime;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public int getKey() {
        return idFlight;
    }


    public int getIdFlight() {
        return idFlight;
    }

    public void setIdFlight(int idFlight) {
        this.idFlight = idFlight;
    }

    public Plane getPlane() {
        return plane;
    }

    public void setPlane(Plane plane) {
        this.plane = plane;
    }

    public int getCurrentSeat() {
        return currentSeat;
    }

    public void setCurrentSeat(int currentSeat) {
        this.currentSeat = currentSeat;
    }

    public Time getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Time departureTime) {
        this.departureTime = departureTime;
    }

    public Time getEstimatedArrivalTime() {
        return estimatedArrivalTime;
    }

    public void setEstimatedArrivalTime(Time estimatedArrivalTime) {
        this.estimatedArrivalTime = estimatedArrivalTime;
    }

    public Location getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(Location fromLocation) {
        this.fromLocation = fromLocation;
    }

    public Location getToLocation() {
        return toLocation;
    }

    public void setToLocation(Location toLocation) {
        this.toLocation = toLocation;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Flight{" +
                "idFlight=" + idFlight +
                ", plane=" + plane +
                ", currentSeat=" + currentSeat +
                ", departureTime=" + departureTime +
                ", estimatedArrivalTime=" + estimatedArrivalTime +
                ", fromLocation='" + fromLocation + '\'' +
                ", toLocation='" + toLocation + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public void Copy(Flight flight) {
        this.idFlight = flight.idFlight;
        this.plane = flight.plane;
        this.currentSeat = flight.currentSeat;
        this.departureDate = flight.departureDate;
        this.departureTime = flight.departureTime;
        this.arrivalDate = flight.arrivalDate;
        this.estimatedArrivalTime = flight.estimatedArrivalTime;
        this.fromLocation = flight.fromLocation;
        this.toLocation = flight.toLocation;
        // createdAt bằng thời gian hiện tại
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
