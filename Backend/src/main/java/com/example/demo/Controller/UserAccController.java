//package com.example.demo.Controller;
//
//import java.lang.ProcessBuilder.Redirect;
//import java.net.http.HttpResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//import java.net.http.HttpResponse;
//import com.example.demo.Service.UserAccService;
//
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@RequestMapping("/userAcc")
//public class UserAccController {
//    @Autowired
//    private UserAccService userAccService;
//
//    public UserAccController(UserAccService userAccService) {
//        this.userAccService = userAccService;
//    }
//
//    // @GetMapping("/login")
//    // public boolean checkLogin(@RequestParam String username, @RequestParam String
//    // password) {
//
//    // return userAccService.checkLogin(username, password);
//    // }
//
//    // @GetMapping("/register")
//    // public boolean register(String username, String password) {
//    // return userAccService.register(username, password);
//    // }
//    @PostMapping("/login")
//    public String Login(@RequestParam String username,
//            @RequestParam String password, HttpSession session) {
//        int result = userAccService.Login(username, password);
//        if (result == 1) {
//            session.setAttribute("Role", "admin");
//            return "redirect:/homeadmin"; // Redirect to admin page
//        } else if (result == 2) {
//            session.setAttribute("Role", "user");
//            return "redirect:/homeuser"; // Redirect to user page
//        } else {
//            return "redirect:/login"; // Redirect to login page with error message
//        }
//    }
//}
//
//// tk, mk -> get api -> service -> check return
//// đăng nhập : nếu đúng -> tạo session