package com.example.demo.Repository;

import com.example.demo.Model.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {
//    Account findByUsername(String username);
//
//    Account findByUsernameAndPassword(String username, String password);

//    Account findByCustomer(Customer customer);
}
