package com.example.demo.Model;

import java.util.ArrayList;
import java.util.Date;

import com.example.demo.Enum.CustomerCategory;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

/*
 * Id_Card string [primary key]
  Full_Name string
  Tel string
  Email string
  Country string
  Day_Of_Birth string
  Sex boolean 0:woman 1:man
  created_at timestamp
 */
@Entity
@Table(name = "Customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_customer")
    private int idCustomer;

    @Column(name = "Full_Name")
    private String fullName;

    @Column(name = "Day_Of_Birth")
    private Date dayOfBirth;

    @Enumerated(EnumType.STRING) // Lưu dưới dạng chuỗi trong DB (ví dụ: "INDIVIDUAL")
    @Column(name = "Customer_Type")
    private CustomerCategory customerType;

   @JoinColumn(name = "account", referencedColumnName = "id_account",nullable = true)
   private Account account;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments = new ArrayList<>();

    public int getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) {
        this.idCustomer = idCustomer;
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

    public CustomerCategory getCustomerType() {
        return customerType;
    }

    public void setCustomerType(CustomerCategory customerType) {
        this.customerType = customerType;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Customer customer)) return false;
        return idCustomer == customer.idCustomer;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(idCustomer);
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }
}
