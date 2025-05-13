package com.example.demo.Repository;

import com.example.demo.Model.Plane;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaneRepo extends JpaRepository<Plane, Integer> {
    Plane findByIdPlane(int idPlane);

    List<Plane> findByNamePlane(String namePlane);

}
