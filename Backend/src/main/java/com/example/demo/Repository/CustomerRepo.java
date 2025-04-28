package com.example.demo.Repository;

import com.example.demo.Model.Customer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    Customer findByIdCard(int idCustomer);

    List<Customer> findByFullName(String nameCustomer);

    List<Customer> findByTel(String teleplone);

    List<Customer> findByEmail(String email);

    List<Customer> findByCountry(String address);
}
