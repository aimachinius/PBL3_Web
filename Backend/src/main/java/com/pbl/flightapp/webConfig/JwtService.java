package com.pbl.flightapp.webConfig;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.security.Key;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import com.pbl.flightapp.Enum.Permission;
import com.pbl.flightapp.Model.Account;
import com.pbl.flightapp.Service.AccountService;
import com.pbl.flightapp.appExc.LoginFailedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class JwtService {

    @Autowired
    private AccountService accountService;
    private static final String SECRET_KEY = "nSkcuvnP9Fh48EqmdtPxZlJYqwvzAjHB";
    private static final long EXPIRATION_TIME = 3600000; // 1 hour

    private Key getSigningKey() {
        byte[] keyBytes = SECRET_KEY.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public String generateToken(String username, String password) throws LoginFailedException {
        Optional<Account> account = accountService.getByUsername(username);
        if (account.isEmpty()) {
            throw new LoginFailedException("Account not found", null, "EMAIL_NOT_FOUND");
        }
        if (!new BCryptPasswordEncoder().matches(password, account.get().getPassword())) {
            throw new LoginFailedException("Password is incorrect", null, "PASSWORD_INCORRECT");
        }

        Map<String, Object> claims = new HashMap<>();
        Set<String> permissions = new HashSet<>();
        if (account.get().getRole() != null) {
            permissions = account.get().getRole().getPermissions().stream().map(Permission::name)
                    .collect(Collectors.toSet());
            claims.put("role", account.get().getRole().getName());
        } else {
            claims.put("role", "CUSTOMER");
        }

        claims.put("permissions", permissions);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username) // phần payload: sub = username
                .setIssuedAt(new Date()) // thời điểm tạo token
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // hạn token
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // ký bằng khóa bí mật
                .compact(); // tạo chuỗi token
    }

    public boolean validateToken(String token) {
        try {
            handleDataInClaim(token, (claims) -> {
                claims.getBody(); // Kiểm tra xem token có hợp lệ không
                return true;
            });
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername(String token) {
        return handleDataInClaim(token, (claims) -> claims.getBody().getSubject());
    }

    @SuppressWarnings("unchecked")
    public Set<String> getPermissions(String token) {
        List<Object> rawPermissions = handleDataInClaim(token, claims -> claims.getBody().get("permissions", List.class));
        return rawPermissions.stream()
                .map(Object::toString)
                .collect(Collectors.toSet());
    }

    private <T> T handleDataInClaim(String token, DataProviderInClaim<T> dataProvider) {
        return dataProvider.handleData(Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token));
    }

    interface DataProviderInClaim<T> {
        T handleData(Jws<Claims> claims);
    }

}