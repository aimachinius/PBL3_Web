package com.pbl.flightapp.webConfig;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebFilters {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        // config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // .csrf(csrf -> csrf.disable())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/login/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/flight/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/bookings/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/bookings/**").permitAll()
                        //
                        .requestMatchers("/account/**").permitAll()
                        .requestMatchers("/role/**").permitAll()
                        //
                        //
                        .requestMatchers("/location/**").permitAll()
                        .anyRequest().authenticated()

                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtService),
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint) // <-- Cấu hình ở đây
                )
                .build();
    }

    // test filter
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler(CustomPermissionEvaluator evaluator) {
        DefaultMethodSecurityExpressionHandler handler = new DefaultMethodSecurityExpressionHandler();
        handler.setPermissionEvaluator(evaluator);
        return handler;
    }
}

// package com.pbl.flightapp.webConfig;

// import java.util.Arrays;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import
// org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
// import
// org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
// import
// org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import
// org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity(prePostEnabled = true)
// public class WebFilters {

// @Autowired
// private JwtService jwtService;

// @Autowired
// private CustomAuthenticationEntryPoint authenticationEntryPoint;

// @Bean
// public CorsConfigurationSource corsConfigurationSource() {
// CorsConfiguration config = new CorsConfiguration();
// // config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
// config.setAllowedOriginPatterns(Arrays.asList("*"));
// config.setAllowedMethods(Arrays.asList("*"));
// config.setAllowedHeaders(Arrays.asList("*"));
// config.setAllowCredentials(true);

// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();
// source.registerCorsConfiguration("/**", config);
// return source;
// }

// // @Bean
// // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
// {
// // return http
// // .cors(cors -> cors.configurationSource(corsConfigurationSource()))
// // .csrf(csrf -> csrf.disable())
// // .sessionManagement(sm ->
// // sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
// // .authorizeHttpRequests(auth -> auth
// // .requestMatchers("/api/admin/**").hasRole("ADMIN")
// // .requestMatchers("/role/**").permitAll()
// // .requestMatchers("/login/**").permitAll()
// // .requestMatchers("/account/**").permitAll()
// // .requestMatchers("/location/**").permitAll()
// // .anyRequest().authenticated())
// // .addFilterBefore(new JwtAuthenticationFilter(jwtService),
// // UsernamePasswordAuthenticationFilter.class)
// // .exceptionHandling(ex -> ex
// // .authenticationEntryPoint(authenticationEntryPoint) // <-- Cấu hình ở đây
// // )
// // .build();
// // }

// // test filter
// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// return http
// .cors(cors -> cors.configurationSource(corsConfigurationSource()))
// .csrf(csrf -> csrf.disable())
// .sessionManagement(sm ->
// sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
// .authorizeHttpRequests(auth -> auth
// .anyRequest().permitAll())
// // .addFilterBefore(new JwtAuthenticationFilter(jwtService),
// // UsernamePasswordAuthenticationFilter.class)
// .exceptionHandling(ex -> ex
// .authenticationEntryPoint(authenticationEntryPoint))
// .build();
// }

// @Bean
// public PasswordEncoder passwordEncoder() {
// return new BCryptPasswordEncoder();
// }

// @Bean
// public MethodSecurityExpressionHandler
// methodSecurityExpressionHandler(CustomPermissionEvaluator evaluator) {
// DefaultMethodSecurityExpressionHandler handler = new
// DefaultMethodSecurityExpressionHandler();
// handler.setPermissionEvaluator(evaluator);
// return handler;
// }
// }
