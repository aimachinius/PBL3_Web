package com.pbl.flightapp.Service;

import com.pbl.flightapp.DTO.PermissionDTO;
import com.pbl.flightapp.Enum.Permission;
import com.pbl.flightapp.Model.Role;
import com.pbl.flightapp.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepo roleRepo;

    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepo.findById(id);
    }

    public Role createRole(Role role) {
        return roleRepo.save(role);
    }

    public Role updateRole(Long id, Role updatedRole) {
        return roleRepo.findById(id).map(role -> {
            role.setName(updatedRole.getName());
            role.setPermissions(updatedRole.getPermissions());
            return roleRepo.save(role);
        }).orElse(null);
    }

    public boolean deleteRole(Long id) {
        if (roleRepo.existsById(id)) {
            roleRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public List<PermissionDTO> getAllPermissions() {
        return Arrays.stream(Permission.values())
                .map(p -> new PermissionDTO(p.name(), p.getDescription()))
                .collect(Collectors.toList());
    }
}
