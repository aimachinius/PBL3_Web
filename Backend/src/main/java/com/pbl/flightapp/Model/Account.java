package com.pbl.flightapp.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_account")
    private int idAccount;
 
    @Column(name = "username",unique = true,nullable = false)
    private String username;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id_user", nullable = true, unique = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "role", referencedColumnName = "id_role", nullable = true)
    private Role role;

    public Account() {}

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Account account)) return false;
        return idAccount == account.idAccount;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(idAccount);
    }

    @Override
    public String toString() {
        return "Account{" +
                "idAccount=" + idAccount +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", role=" + role +
                '}';
    }
    public void copyFrom(Account other) {
        if (other == null) return;
        this.username = other.username;
        this.password = other.password;
        // this.role = other.role; // shallow copy
    }
}
// Tạo tk -> Nhậpf Account bao gồm customer
// đăng nhập -> kiểm tra username và password có đúng không
