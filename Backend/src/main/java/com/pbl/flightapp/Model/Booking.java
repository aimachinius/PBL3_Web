package com.pbl.flightapp.Model;

import com.pbl.flightapp.Enum.PaymentMethod;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer", referencedColumnName = "id_user", nullable = false)
    private User customer;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "payment_date")
    private Timestamp paymentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;    
    
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets;

    public Booking() {
    }

    public Booking( User customer,List<Ticket> tickets, PaymentMethod paymentMethod) {
        this.tickets = tickets;
        this.customer = customer;
        this.paymentMethod = paymentMethod;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return customer;
    }

    public void setUser(User user) {
        this.customer = user;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
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

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Booking booking)) return false;
        return id == booking.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
    // Getters và Setters
}
