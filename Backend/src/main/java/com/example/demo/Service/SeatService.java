package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.SeatRepo;
import com.example.demo.Model.Seat;
import java.util.List;
import com.example.demo.Model.Plane;

@Service
public class SeatService {
    @Autowired
    private SeatRepo seatRepo;

    public SeatService(SeatRepo seatRepo) {
        this.seatRepo = seatRepo;
    }

    public SeatService() {
    }

    public List<Seat> getAllSeat() {
        return seatRepo.findAll();
    }

    public Seat getSeatById(int idSeat) {
        return seatRepo.findByIdSeat(idSeat);
    }

//    public List<Seat> getSeatByPlaneId(Plane plane) {
//        return seatRepo.findByPlane(plane);
//    }

    public List<Seat> getSeatByPlane(Plane plane) {
        return plane.getSeats();
    }

    public List<Seat> getSeatByType(String seatType) {
        return seatRepo.findBySeatType(seatType);
    }

    public void deleteSeat(int idSeat) {
        seatRepo.deleteById(idSeat);
    }

    public void addSeat(Seat seat) {
        if (!seatRepo.existsById(seat.getIdSeat())) {
            seatRepo.save(seat);
        }
    }

    public void updateSeat(Seat seat) {
        if (seatRepo.existsById(seat.getIdSeat())) {
            Seat exist = seatRepo.findByIdSeat(seat.getIdSeat());
            exist.Copy(seat);
            seatRepo.save(exist);
        } else {
            addSeat(seat);
        }
    }
}
