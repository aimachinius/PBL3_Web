package com.pbl.flightapp.Controller;

import com.pbl.flightapp.DTO.PermissionDTO;
import com.pbl.flightapp.Model.Role;
import com.pbl.flightapp.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/role")
@CrossOrigin(origins = "*")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    @PreAuthorize("hasPermission(null, 'VIEW_QUYEN_TRUY_CAP')")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'VIEW_QUYEN_TRUY_CAP')")
    public Optional<Role> getRoleById(@PathVariable Long id) {
        return roleService.getRoleById(id);
    }

    @PostMapping
    @PreAuthorize("hasPermission(null, 'EDIT_QUYEN_TRUY_CAP')")
    public Role createRole(@RequestBody Role role) {
        return roleService.createRole(role);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_QUYEN_TRUY_CAP')")
    public Role updateRole(@PathVariable Long id, @RequestBody Role role) {
        return roleService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_QUYEN_TRUY_CAP')")
    public String deleteRole(@PathVariable Long id) {
        return roleService.deleteRole(id) ? "Deleted successfully" : "Role not found";
    }

    @GetMapping("/permissions")
    public List<PermissionDTO> getAllPermissions() {
        return  roleService.getAllPermissions();
    }

}
