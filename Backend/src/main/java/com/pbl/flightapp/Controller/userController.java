package com.pbl.flightapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.pbl.flightapp.Service.UserService;
import com.pbl.flightapp.Model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.pbl.flightapp.appExc.UserException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/user")
public class userController {
    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_NGUOI_DUNG')")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User updatedUser) {

        return ResponseEntity.ok(userService.updateUser(id, updatedUser));

    }

    @PostMapping("/create")
    @PreAuthorize("hasPermission(null, 'EDIT_NGUOI_DUNG')")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.createUser(user));
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/find_user")
    @PreAuthorize("hasPermission(null, 'VIEW_NGUOI_DUNG')")
    public ResponseEntity<?> findUser(@RequestParam(required = false) String email) {
        return ResponseEntity.ok(userService.getAllUser(email));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_NGUOI_DUNG')")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
