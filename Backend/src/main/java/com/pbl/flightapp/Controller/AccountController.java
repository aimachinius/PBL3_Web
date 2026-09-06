package com.pbl.flightapp.Controller;

import com.pbl.flightapp.DTO.AccountDTO;
import com.pbl.flightapp.Model.Account;
import com.pbl.flightapp.Model.User;
import com.pbl.flightapp.Service.AccountService;
import com.pbl.flightapp.appExc.AccountException;
import com.pbl.flightapp.appExc.UserException;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Lấy tất cả account dạng DTO
    @GetMapping("/find-account-by-email")
    @PreAuthorize("hasPermission(null, 'VIEW_TAI_KHOANG')")
    public ResponseEntity<?> getAllAccountByEmail(@RequestParam String username, @RequestParam(required = false) Integer roleId) {
        try {
            List<AccountDTO> accounts = accountService.getAllAccountByUsername(username, roleId);
            if (accounts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No accounts found");
            }
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Lấy account theo id
    @GetMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'VIEW_TAI_KHOANG')")
    public Optional<Account> getAccountById(@PathVariable int id) {
        return accountService.getAccountById(id);
    }

    // Tạo account mới
    @PostMapping
    @PreAuthorize("hasPermission(null, 'EDIT_TAI_KHOANG')")
    public ResponseEntity<?> createAccount(@RequestBody AccountDTO createAccountRequest) {
        Map<String, String> response = new HashMap<>();
        try {
            Account account = accountService.createAccount(createAccountRequest);
            return ResponseEntity.ok(account);
        } catch (AccountException e) {
            response.put("message", e.getMessage());
            response.put("code", e.getCode());
        } catch (UserException e) {
            response.put("message", e.getMessage());
            response.put("code", e.getCode());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @PutMapping("/{id}/change-profile")
    @PreAuthorize("hasPermission(null, 'EDIT_TAI_KHOANG')")
    public ResponseEntity<?> changeProfile(@PathVariable int id, @RequestBody User updatedUser) {

        Optional<Account> account = accountService.getAccountById(id);
        if (account.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }
        userController userController = new userController();
       return userController.updateUser(id, updatedUser);
    }

    /*
     * chỉ yêu câu thanh đổi tk mk và role của account
     */
    // Cập nhật account theo id
    @PutMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_TAI_KHOANG')")
    public ResponseEntity<?> updateAccount(@PathVariable int id, @RequestBody Account updatedAccount) {
        try {
            Account account = accountService.updateAccount(id, updatedAccount);
            return ResponseEntity.ok(account);
        } catch (AccountException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            response.put("code", e.getCode());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    // Xóa account theo id
    @DeleteMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'EDIT_TAI_KHOANG')")
    public ResponseEntity<?> deleteAccount(@PathVariable int id) {
        boolean deleted = accountService.deleteAccount(id);
        return deleted ? ResponseEntity.ok("Deleted successfully")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
    }
}