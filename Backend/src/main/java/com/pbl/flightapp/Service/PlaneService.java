package com.pbl.flightapp.Service;

import java.util.List;

import com.pbl.flightapp.Model.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pbl.flightapp.Repository.SeatRepo;
import com.pbl.flightapp.Repository.PlaneRepo;
import com.pbl.flightapp.Model.Plane;
import com.pbl.flightapp.Enum.Status;

@Service
public class PlaneService {
    @Autowired
    private PlaneRepo planeRepo;
    @Autowired
    private SeatRepo seatRepo;
    @Autowired
    private  FlightService flightService;


    public PlaneService() {
    }

    public PlaneService(PlaneRepo planeRepo) {
        this.planeRepo = planeRepo;
    }

    public List<Plane> getAllPlane() {
        List<Plane> allPlane = planeRepo.findAll();
        allPlane.forEach(plane -> plane.setSeatCount(seatRepo.countByPlane(plane)));
        return allPlane;
    }
    @Transactional
    void updateStatus(int idPlane, Status status){
        Plane plane = planeRepo.findByIdPlane(idPlane);
        plane.setStatus(status);
    }

    public Plane getPlaneById(int idPlane) {
        return planeRepo.findByIdPlane(idPlane);
    }

    public List<Plane> getPlaneByName(String namePlane) {
        return planeRepo.findByNamePlane(namePlane);
    }

    // public List<Plane> getPlaneBySeatCount(int seatCount) {
    // return planeRepo.findBySeatCount(seatCount);
    // }

    public void deletePlane(int idPlane) {
        planeRepo.deleteById(idPlane);
    }

    public void addPlane(Plane plane) {
        planeRepo.save(plane);
    }

    @Transactional
    public void updatePlane(int idPlane, Plane plane) {
        Plane exist = planeRepo.findByIdPlane(idPlane);
        if (exist == null) {
            throw new RuntimeException("Plane not found");
        }
        DynamicSchedulerService.getScheduledTasks().forEach(
                (idFlight,value) -> {
                   Flight flight =  flightService.getFlightById(idFlight);
                   if(flight.getPlane().getIdPlane() == idPlane){
                       throw new RuntimeException("Máy bay đã được lên lịch ở chuyến VN"+flight.getIdFlight()+",không thể chỉnh sửa");
                   }
                }
        );

        exist.CopyFrom(plane);
    }

    public void updatePlaneStatus(int idPlane, Status status) {
        Plane plane = planeRepo.findByIdPlane(idPlane);
        if (plane != null) {
            plane.setStatus(status);
            planeRepo.save(plane);
        }
    }
}
