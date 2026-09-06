package com.pbl.flightapp.Service;

import com.pbl.flightapp.DTO.AccountDTO;
import com.pbl.flightapp.Enum.UserType;
import com.pbl.flightapp.Model.Account;
import com.pbl.flightapp.Model.Role;
import com.pbl.flightapp.Model.User;

import com.pbl.flightapp.appExc.LoginFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pbl.flightapp.Repository.AccountRepo;
import com.pbl.flightapp.Repository.RoleRepo;
import com.pbl.flightapp.appExc.AccountException;
import com.pbl.flightapp.appExc.UserException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepo accountRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private UserService userService;

    // Lấy tất cả account
    public List<AccountDTO> getAllAccountByUsername(String username, Integer roleId) {
        if (username != null && username.isEmpty())
            username = null;
        return accountRepo.findAccountDTOs(username, roleId);
    }

    private void validateAccount(Account account) throws AccountException {
        Account existingAccount = accountRepo.findByUsername(account.getUsername());
        if (existingAccount != null && !existingAccount.equals(account))
            throw new AccountException("Username already exists", "USERNAME_ALREADY_EXISTS");
        if (account.getUsername() == null || account.getUsername().isEmpty())
            throw new AccountException("Username is required", "USERNAME_REQUIRED");
        if (account.getPassword() == null || account.getPassword().isEmpty())
            throw new AccountException("Password is required", "PASSWORD_REQUIRED");
    }

    // Tạo mới account
    @Transactional
    public Account createAccount(AccountDTO createAccountRequest) throws AccountException, UserException {
        Account account = createAccountRequest.getAccount();
        User user = createAccountRequest.getUser();
        Role requestRole = createAccountRequest.getRole();
        validateAccount(account);
        UserService.validateUser(user);
        Long roleId = null;
        if (requestRole != null)
            roleId = requestRole.getId();

        Role role = null;
        user.setUserType(UserType.CUSTOMER);
        if (roleId != null) {
            role = roleRepo.findById(roleId).orElse(null);
            user.setUserType(UserType.ADMIN);
            if (role == null) {
                System.out.println("Role not found");
                throw new AccountException("Role not found", "ROLE_NOT_FOUND");
            }
        }
        account.setRole(role);
        account.setPassword(new BCryptPasswordEncoder().encode(account.getPassword()));
        account.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));

        account.setUser(userService.createUser(user));

        try {
            return accountRepo.save(account);
        } catch (DataIntegrityViolationException e) {
            throw new AccountException("Username already exists", "USERNAME_ALREADY_EXISTS");
        } catch (Exception e) {
            throw new AccountException("Error creating account", "ERROR_CREATING_ACCOUNT");
        }
    }

    // Lấy account theo id
    public Optional<Account> getAccountById(int id) {
        return accountRepo.findById(id);
    }

    public Optional<Account> getByUsername(String username) {
        return Optional.ofNullable(accountRepo.findByUsername(username));
    }
    @Transactional
    public void changePassword( int idAccount,String newPass, String oldPass){
        Account account = accountRepo.getReferenceById(idAccount);
        if(!new BCryptPasswordEncoder().matches(oldPass, account.getPassword())){
            throw new AccountException("Mật khẩu hiện tại không chính xác","PASSWORD_INCORRECT");
        }
        account.setPassword(new BCryptPasswordEncoder().encode(newPass));
    }


    // chi cập nhật account và role không cập nhật user
    // Cập nhật account
    @Transactional
    public Account updateAccount(int id, Account updatedAccount) throws AccountException {
        updatedAccount.setIdAccount(id);
        validateAccount(updatedAccount);
        Account account = accountRepo.findById(id).orElse(null);
        if (account == null) {
            throw new AccountException("Account not found", "ACCOUNT_NOT_FOUND");
        }
        account.copyFrom(updatedAccount);
        account.setPassword(new BCryptPasswordEncoder().encode(account.getPassword()));
        if (updatedAccount.getRole() != null) {
            Role role = roleRepo.findById(updatedAccount.getRole().getId()).orElse(null);
            if (role == null) {
                throw new AccountException("Role not found", "ROLE_NOT_FOUND");
            }
            account.setRole(role);
            account.getUser().setUserType(UserType.ADMIN);
        } else {
            account.setRole(null);
            account.getUser().setUserType(UserType.CUSTOMER);
        }
        return account;
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
    // public int Login(String username, String password) {
    // Account userAccount = AccountRepo.findByUsernameAndPassword(username,
    // password);
    // if (userAccount != null) {
    // if (userAccount.getRole().equals("admin")) {
    // return 1; // Admin
    // } else {
    // return 2; // User
    // }
    // } else {
    // return 0; // Error
    // }
    // }

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
