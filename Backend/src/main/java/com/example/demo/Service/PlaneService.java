package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.PlaneRepo;
import com.example.demo.Model.Plane;
import com.example.demo.Enum.Status;

@Service
public class PlaneService {
    @Autowired
    private PlaneRepo planeRepo;

    public PlaneService() {
    }

    public PlaneService(PlaneRepo planeRepo) {
        this.planeRepo = planeRepo;
    }

    public List<Plane> getAllPlane() {
        return planeRepo.findAll();
    }

    public Plane getPlaneById(int idPlane) {
        return planeRepo.findByIdPlane(idPlane);
    }

    public List<Plane> getPlaneByName(String namePlane) {
        return planeRepo.findByNamePlane(namePlane);
    }

//    public List<Plane> getPlaneBySeatCount(int seatCount) {
//        return planeRepo.findBySeatCount(seatCount);
//    }

    public void deletePlane(int idPlane) {
        planeRepo.deleteById(idPlane);
    }

    public void addPlane(Plane plane) {
        if (!planeRepo.existsById(plane.getIdPlane())) {
            planeRepo.save(plane);
        }
    }

    public void updatePlane(Plane plane) {
        if (planeRepo.existsById(plane.getIdPlane())) {
            Plane exist = planeRepo.findByIdPlane(plane.getIdPlane());
            exist = plane;
            planeRepo.save(exist);
        } else {
            addPlane(plane);
        }
    }

    public void updatePlaneStatus(int idPlane, Status status) {
        Plane plane = planeRepo.findByIdPlane(idPlane);
        if (plane != null) {
            plane.setStatus(status);
            planeRepo.save(plane);
        }
    }
}
