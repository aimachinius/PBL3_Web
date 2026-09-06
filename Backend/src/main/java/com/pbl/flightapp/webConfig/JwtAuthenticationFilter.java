package com.pbl.flightapp.webConfig;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pbl.flightapp.appExc.PermissionException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String token = jwtService.extractToken(request); // có thể lấy từ cookie hoặc header
        if (token != null && jwtService.validateToken(token)) {
            String username = jwtService.getUsername(token);
            Set<String> permissions = jwtService.getPermissions(token);

            // huyển roles thành GrantedAuthority
            List<GrantedAuthority> authorities = permissions.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null,
                    authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        // chuyển tiếp request và response đến filter tiếp theo
        filterChain.doFilter(request, response);
    }
}
// cách này dùng đăng nhập bằng form login
// package com.pbl.flightapp;

// import java.util.HashSet;
// import java.util.Optional;
// import java.util.Set;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.User;
// import
// org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.pbl.flightapp.Model.Account;
// import com.pbl.flightapp.Service.AccountService;
// @Service
// ic class UserDetailsServiceImpl implements UserDetailsService {

// @Autowired
// private AccountService accountService;

//
// rride
// ic UserDetails loadUserByUsername(String username) throws
// UsernameNotFoundException {
// onal<Account> account = accountService.getByEmail(username);
// if (account.isEmpty()) {
// throw new UsernameNotFoundException("User not found");
//
// tedAuthority> authorities = account.get().getRole().getPermissions()
// .stream()
// .map(permission -> new SimpleGrantedAuthority(permission.name(
// ))
// .collect(Collectors.toSet());
// return new User(account.get().getEmail(), account.get().getPassword(),
// authorities);
// }
// }
