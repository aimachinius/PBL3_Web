package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idFlight")
@Table(name = "Flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Flight")
    private int idFlight;

    @ManyToOne
    @JoinColumn(name = "Id_Plane", referencedColumnName = "Id_Plane", nullable = false)
    private Plane plane;

    @Column(name = "Departure_Date", nullable = false)
    private Date departureDate;
    @Column(name = "Departure_Time", nullable = false)
    private Time departureTime;
    @Column(name = "Duration_Minutes")
    private Long durationMinutes;

    @Column(name = "common_fare", nullable = false)
    private Long commonFare;
    @Column(name = "vip_fare", nullable = false)
    private Long vipFare;

    @ManyToOne
    @JoinColumn(name = "F_R_O_M", referencedColumnName = "id", nullable = false)
    private Location fromLocation;

    @ManyToOne
    @JoinColumn(name = "T_O", referencedColumnName = "id", nullable = false)
    private Location toLocation;


    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flights_Seat> flightsSeatList;
    // @OneToMany(mappedBy = "flightReturn", cascade =
    // CascadeType.ALL,orphanRemoval = true)
    // private List<Ticket> boughtTicket;

    //
    // public List<Ticket> getBoughtTicket() {
    // return boughtTicket;
    // }
    //
    // public void setBoughtTicket(List<Ticket> boughtTicket) {
    // this.boughtTicket = boughtTicket;
    // }

    private Timestamp createdAt;

    public long getCommonFare() {
        return commonFare;
    }

    public void setCommonFare(long commonFare) {
        this.commonFare = commonFare;
    }

    public long getVipFare() {
        return vipFare;
    }

    public void setVipFare(long vipFare) {
        this.vipFare = vipFare;
    }

    public void setCommonFare(Long commonFare) {
        this.commonFare = commonFare;
    }

    public void setVipFare(Long vipFare) {
        this.vipFare = vipFare;
    }

    public Flight() {
    }

    public List<Flights_Seat> getFlightsSeatList() {
        return flightsSeatList;
    }

    public void setFlightsSeatList(List<Flights_Seat> flightsSeatList) {
        this.flightsSeatList = flightsSeatList;
    }

    public Long getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Long durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Flight(Plane plane, Date departureDate, Time departureTime, Long durationMinutes, Location fromLocation,
            Location toLocation, List<Flights_Seat> flightsSeatList, Timestamp createdAt) {
        this.plane = plane;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.durationMinutes = durationMinutes;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.flightsSeatList = flightsSeatList;
        this.createdAt = createdAt;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
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

    public Time getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Time departureTime) {
        this.departureTime = departureTime;
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
                ", departureTime=" + departureTime +
                ", fromLocation='" + fromLocation + '\'' +
                ", toLocation='" + toLocation + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public void Copy(Flight flight) {
        this.idFlight = flight.idFlight;
        this.plane = flight.plane;
        this.departureDate = flight.departureDate;
        this.departureTime = flight.departureTime;
        this.durationMinutes = flight.durationMinutes;
        this.fromLocation = flight.fromLocation;
        this.toLocation = flight.toLocation;
        // createdAt bằng thời gian hiện tại
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
