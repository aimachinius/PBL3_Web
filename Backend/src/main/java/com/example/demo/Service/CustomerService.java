package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.CustomerRepo;
import com.example.demo.Model.Customer;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    public CustomerService() {
    }

    public CustomerService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public List<Customer> getAllCustomer() {
        return customerRepo.findAll();
    }
/*

    public Customer getCustomerById(int idCustomer) {
        return customerRepo.findByIdCard(idCustomer);
    }

    public List<Customer> getCustomerByName(String nameCustomer) {
        return customerRepo.findByFullName(nameCustomer);
    }

    public List<Customer> getCustomerByPhoneNumber(String phoneNumber) {
        return customerRepo.findByTel(phoneNumber);
    }

    public List<Customer> getCustomerByEmail(String email) {
        return customerRepo.findByEmail(email);
    }

    public List<Customer> getCustomerByCountry(String country) {
        return customerRepo.findByCountry(country);
    }

    public void deleteCustomer(int idCustomer) {
        customerRepo.deleteById(idCustomer);
    }

    public void addCustomer(Customer customer) { // Nếu tồn tài thì không add
        if (!customerRepo.existsById(customer.getIdCustomer())) {
            customerRepo.save(customer);
        }
    }
*/

//    public void updateCustomer(Customer customer) {
//        if (customerRepo.existsById(customer.getIdCustomer())) {
//            Customer exist = customerRepo.findByIdCard(customer.getIdCustomer());
//            exist.Copy(customer);
//            customerRepo.save(exist);
//        } else {
//            addCustomer(customer);
//        }
//    }

    public void addCustomerToTicket(Customer customer) {
        // Thêm vào vé
        // nếu id đã tồn tại, tức là có thể đã ở trước đó
    }
}
