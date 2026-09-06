package com.pbl.flightapp.Model;

import java.util.ArrayList;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pbl.flightapp.Enum.UserType;
import com.pbl.flightapp.Enum.userSex;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int idUser;

    @Column(name = "Full_Name", nullable = false)
    private String fullName;

    @Column(name = "phone",unique = true)
    private String phone;

    @Column(name = "email",unique = true)
    private String email;

    @Column(name ="Card_Number", unique = true)
    private String cardNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "sex")
    @Enumerated(EnumType.STRING)
    private userSex sex;

    @Column(name = "Day_Of_Birth")
    private Date dayOfBirth;
    
    @Column(name = "user_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Account account;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(Date dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public Account getAccount() {
        return account;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public userSex getSex() {
        return sex;
    }

    public void setSex(userSex sex) {
        this.sex = sex;
    }
    public void copyFromNotCopyType(User other) {
        this.fullName = other.fullName;
        this.phone = other.phone;
        this.email = other.email;
        this.cardNumber = other.cardNumber;
        this.address = other.address;
        this.sex = other.sex;
        this.dayOfBirth = other.dayOfBirth;
    }
    

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof User user)) return false;
        return idUser == user.idUser;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(idUser);
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}
