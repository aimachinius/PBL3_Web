package com.pbl.flightapp.DTO;

import java.sql.Timestamp;

import com.pbl.flightapp.Model.Account;
import com.pbl.flightapp.Model.Role;
import com.pbl.flightapp.Model.User; 

public class AccountDTO {
    private int idAccount;
    private String username;
    private String password;
    private Timestamp createdAt;
    private Role role;
    private User user;

    public AccountDTO() {
    }

    public AccountDTO(int idAccount, String username, String password, Timestamp createdAt,
            Role role, User user) {
        this.idAccount = idAccount;
        this.username = username;
        this.password = password;
        this.role = role;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Account getAccount() {
        return new Account(username, password);
    }

    public int getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(int idAccount) {
        this.idAccount = idAccount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
