package com.pbl.flightapp.DTO;

import java.sql.Timestamp;


import com.pbl.flightapp.Enum.PaymentMethod;
import com.pbl.flightapp.Model.Booking;


public class BookingDTO {
    private int id;
    private UserDTO customerWhoBought;
    private Timestamp paymentDate;
    private PaymentMethod paymentMethod;  
    private double totalPrice;

    // Constructors
    public BookingDTO() {
    }

    public BookingDTO(Booking booking) {
        this.id = booking.getId();
        this.customerWhoBought = new UserDTO(booking.getUser());
        this.paymentDate = booking.getPaymentDate();
        this.totalPrice = booking.getAmount() != null ? booking.getAmount() : 0;
        this.paymentMethod = booking.getPaymentMethod();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserDTO getCustomerWhoBought() {
        return customerWhoBought;
    }

    public void setCustomerWhoBought(UserDTO customerWhoBought) {
        this.customerWhoBought = customerWhoBought;
    }

    public Timestamp getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Timestamp paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
