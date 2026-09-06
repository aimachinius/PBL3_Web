package com.pbl.flightapp.DTO;

import com.pbl.flightapp.Enum.SeatStatus;
import com.pbl.flightapp.Model.Seat;


public class FlightSeatDTO {

    private Seat seat;

    private SeatStatus seatStatus;

    public FlightSeatDTO(Seat seat, SeatStatus seatStatus) {
        this.seat = seat;
        this.seatStatus = seatStatus;
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
}
