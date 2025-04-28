package com.example.demo.Repository;

import com.example.demo.Model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  LocationRepo extends JpaRepository<Location, Integer> {

}
