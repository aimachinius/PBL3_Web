package com.example.demo.Service;

import com.example.demo.Model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.UserAccRepo;

@Service
public class UserAccService {
    @Autowired
    UserAccRepo userAccRepo;
 
    public UserAccService() {
    }

    public UserAccService(UserAccRepo userAccRepo) {
        this.userAccRepo = userAccRepo;
    }

    public int Login(String username, String password) {
        Account userAccount = userAccRepo.findByUsernameAndPassword(username, password);
        if (userAccount != null) {
            if (userAccount.getRole().equals("admin")) {
                return 1; // Admin
            } else {
                return 2; // User
            }
        } else {
            return 0; // Error
        }
    }

    // public boolean checkLogin(String username, String password) {
    // HttpSession session = request.get; // Assuming you have a session object
    // available
    // if (username == "admin" && password == "admin") {
    // session.setAttribute("Role", "admin");
    // return true;
    // } else {
    // Account userAccount = userAccRepo.findByUsernameAndPassword(username,
    // password);
    // if (userAccount != null) {
    // session.setAttribute("Role", "user");
    // return true;
    // } else {
    // return false;
    // }
    // }
    // }
}
