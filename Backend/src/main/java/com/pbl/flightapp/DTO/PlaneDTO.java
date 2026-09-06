package com.pbl.flightapp.DTO;

import com.pbl.flightapp.Enum.Status;
import com.pbl.flightapp.Model.Plane;

public class PlaneDTO {
    private int idPlane;
    private String namePlane; 
    private Status status;
    private int flightHours;
    private int seatCount;

    public PlaneDTO() {
    }

    public PlaneDTO(Plane plane) {
        this.idPlane = plane.getIdPlane();
        this.namePlane = plane.getNamePlane();
        this.status = plane.getStatus();
        this.flightHours = plane.getFlightHours();
        this.seatCount = plane.getSeatCount();
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

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }
}
