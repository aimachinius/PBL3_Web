package com.pbl.flightapp.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pbl.flightapp.Repository.UserRepo;
import com.pbl.flightapp.DTO.UserDTO;
import com.pbl.flightapp.Model.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pbl.flightapp.appExc.UserException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public UserService() {
    }

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<UserDTO> getAllUser(String email) {
        if (email != null && email.isEmpty())
            email = null;
        return userRepo.findUser(email);
    }

    @Transactional
    public User createUser(User user) throws UserException {
        validateUser(user);
        // check

        existFielofUser(user).forEach((key, value) -> {
            if (value != null)
            throw new UserException( UserException.getNotices().get(key),key);
        });
        return userRepo.save(user);
    }

    public User findByCustomerInformation(String email, String phone, String cardNumber) {
        return userRepo.findAnyMatch(email, phone, cardNumber);
    }

    @Transactional
    public User createUpdateUser(User user) throws UserException {
        User userExist = null;
        if (user.getEmail() != null && user.getEmail().isEmpty()) {
            user.setEmail(null);
        }
        if (user.getPhone() != null && user.getPhone().isEmpty()) {
            user.setPhone(null);
        }
        if (user.getCardNumber() != null && user.getCardNumber().isEmpty()) {
            user.setCardNumber(null);
        }
        userExist = userRepo.findAnyMatch(user.getEmail(), user.getPhone(), user.getCardNumber());

        if (userExist != null) {
            return updateUser(userExist.getIdUser(), user);
        }
        return createUser(user);
    }

    @Transactional
    public User updateUser(int id, User updatedUser) throws UserException {
        User user = userRepo.findById(id).orElse(null);
        if (user == null) {
            throw new UserException("User not found", "USER_NOT_FOUND");
        }
        validateUser(updatedUser);
        existFielofUser(updatedUser).forEach((key, value) -> {
            if (value != null && (User) value != user)
                throw new UserException( UserException.getNotices().get(key),key);
        });
        user.copyFromNotCopyType(updatedUser);
        return user;
    }

    static void validateUser(User user) throws UserException {
        if (user.getFullName() == null || user.getFullName().isEmpty())
            throw new UserException("Full name is required", "FULL_NAME_REQUIRED");
    }

    private Map<String, Object> existFielofUser(User checkUser) {
        Map<String, Object> mapFiel = new HashMap<>();
        mapFiel.put("EMAIL_IS_EXIST", userRepo.findAnyMatch(checkUser.getEmail(), null, null));
        mapFiel.put("NUMBER_PHONE_IS_EXIST", userRepo.findAnyMatch(null, checkUser.getPhone(), null));
        mapFiel.put("CARD_NUMBER_IS_EXIST", userRepo.findAnyMatch(null, null, checkUser.getCardNumber()));
        return mapFiel;
    }

    @Transactional
    public boolean deleteUser(int id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return true;
        }
        return false;
    }
    /*
     * 
     * public Customer getCustomerById(int idCustomer) {
     * return customerRepo.findByIdCard(idCustomer);
     * }
     * 
     * public List<Customer> getCustomerByName(String nameCustomer) {
     * return customerRepo.findByFullName(nameCustomer);
     * }
     * 
     * public List<Customer> getCustomerByPhoneNumber(String phoneNumber) {
     * return customerRepo.findByTel(phoneNumber);
     * }
     * 
     * public List<Customer> getCustomerByEmail(String email) {
     * return customerRepo.findByEmail(email);
     * }
     * 
     * public List<Customer> getCustomerByCountry(String country) {
     * return customerRepo.findByCountry(country);
     * }
     * 
     * public void deleteCustomer(int idCustomer) {
     * customerRepo.deleteById(idCustomer);
     * }
     * 
     * public void addCustomer(Customer customer) { // Nếu tồn tài thì không add
     * if (!customerRepo.existsById(customer.getIdCustomer())) {
     * customerRepo.save(customer);
     * }
     * }
     */

    // public void updateCustomer(Customer customer) {
    // if (customerRepo.existsById(customer.getIdCustomer())) {
    // Customer exist = customerRepo.findByIdCard(customer.getIdCustomer());
    // exist.Copy(customer);
    // customerRepo.save(exist);
    // } else {
    // addCustomer(customer);
    // }
    // }

    public void addUserToTicket(User user) {
        // Thêm vào vé
        // nếu id đã tồn tại, tức là có thể đã ở trước đó
    }
}
