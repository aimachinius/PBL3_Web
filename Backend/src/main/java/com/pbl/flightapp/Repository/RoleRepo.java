package com.pbl.flightapp.Repository;

import com.pbl.flightapp.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
}
