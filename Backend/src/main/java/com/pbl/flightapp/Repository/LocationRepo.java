package com.pbl.flightapp.Repository;

import com.pbl.flightapp.Model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  LocationRepo extends JpaRepository<Location, Integer> {

}
