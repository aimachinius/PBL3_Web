package com.example.demo.Service;

import com.example.demo.Model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.AccountRepo;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepo accountRepo;

    // Lấy tất cả account
    public List<Account> getAllAccount() {
        return accountRepo.findAll();
    }

    // Tạo mới account
    public Account createAccount(Account account) {
        account.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        return accountRepo.save(account);
   }

    // Lấy account theo id
    public Optional<Account> getAccountById(int id) {
        return accountRepo.findById(id);
    }

    // Cập nhật account
    public Account updateAccount(int id, Account updatedAccount) {
        return accountRepo.findById(id).map(account -> {
            account.copyFrom(updatedAccount);
            return accountRepo.save(account);
        }).orElse(null);
    }

    // Xóa account
    public boolean deleteAccount(int id) {
        if (accountRepo.existsById(id)) {
            accountRepo.deleteById(id);
            return true;
        }
        return false;
    }

//
//    public int Login(String username, String password) {
//        Account userAccount = AccountRepo.findByUsernameAndPassword(username, password);
//        if (userAccount != null) {
//            if (userAccount.getRole().equals("admin")) {
//                return 1; // Admin
//            } else {
//                return 2; // User
//            }
//        } else {
//            return 0; // Error
//        }
//    }

    // public boolean checkLogin(String username, String password) {
    // HttpSession session = request.get; // Assuming you have a session object
    // available
    // if (username == "admin" && password == "admin") {
    // session.setAttribute("Role", "admin");
    // return true;
    // } else {
    // Account userAccount = AccountRepo.findByUsernameAndPassword(username,
    // password);
    // if (userAccount != null) {
    // session.setAttribute("Role", "user");
    // return true;
    // } else {
    // return false;
    // }
    // }
    // }
}
