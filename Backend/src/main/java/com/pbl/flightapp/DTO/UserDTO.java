package com.pbl.flightapp.DTO;

import java.util.Date;

import com.pbl.flightapp.Enum.UserType;
import com.pbl.flightapp.Model.User;

public class UserDTO {
    private int idUser;
    private String fullName;
    private String phone;
    private String address;
    private String email;
    private Date dateOfBirth;
    private UserType userType;
    private String cardNumber;
    private String sex;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.idUser = user.getIdUser();
        this.fullName = user.getFullName();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.dateOfBirth = user.getDayOfBirth();
        this.userType = user.getUserType();
        this.cardNumber = user.getCardNumber();
        if (user.getSex() != null) {
            this.sex = user.getSex().toString();
        }
    }

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

}