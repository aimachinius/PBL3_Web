package com.example.demo.Repository;

import com.example.demo.Account.UserAccount;
import com.example.demo.Model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccRepo extends JpaRepository<UserAccount, Integer> {
    UserAccount findByUsername(String username);

    UserAccount findByUsernameAndPassword(String username, String password);

//    UserAccount findByCustomer(Customer customer);
}
