package com.pbl.flightapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.pbl.flightapp.Model.Account;
import com.pbl.flightapp.Service.AccountService;
import com.pbl.flightapp.appExc.LoginFailedException;
import com.pbl.flightapp.webConfig.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;

@Controller
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AccountService accountService;

    private Account getAccoutByRequest (HttpServletRequest request){
        String userName = jwtService.getUsername(jwtService.extractToken(request));
        Optional<Account> account = accountService.getByUsername(userName);
        if (account.isEmpty()) {
            throw new RuntimeException("Không tìm thấy tài khoảng người dùng");
        }
        return account.get();
    }


    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        return ResponseEntity.ok(getAccoutByRequest(request));
    }
   public static class LoginRequest{
        Account account;
        boolean keepLoggedIn;

       public Account getAccount() {
           return account;
       }

       public void setAccount(Account account) {
           this.account = account;
       }

       public boolean isKeepLoggedIn() {
           return keepLoggedIn;
       }

       public void setKeepLoggedIn(boolean keepLoggedIn) {
           this.keepLoggedIn = keepLoggedIn;
       }
   }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginRequest loginRequest,
            HttpServletResponse response) {
        String jwtToken = null;
        try {
            jwtToken = jwtService.generateToken(loginRequest.account.getUsername(), loginRequest.account.getPassword());
        } catch (LoginFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message",e.getMessage(),"code",e.getCode()));
        }
        // Tạo cookie
        ResponseCookie cookie = ResponseCookie.from("token", jwtToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours( loginRequest.keepLoggedIn ? 24 : 1))
                .build();
        // Đưa cookie vào response
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        // Trả response
        return ResponseEntity.ok(jwtService.getPermissions(jwtToken));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest ,HttpServletRequest request){
        Account account = getAccoutByRequest(request);
        accountService.changePassword(account.getIdAccount(),changePasswordRequest.getNewPassword(),changePasswordRequest.getOldPassword());
        return ResponseEntity.ok("Đổi mật khẩu thành công");
    }

    public static class ChangePasswordRequest{
        private String oldPassword;
        private String newPassword;

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }

        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }
    }


    @PostMapping("/logoutApp")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        // Gửi cookie xoá về trình duyệt
        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
        // Phản hồi
        return ResponseEntity.ok("Đăng xuất thành công");
    }
}