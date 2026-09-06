package com.pbl.flightapp.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.pbl.flightapp.Model.User;
import com.pbl.flightapp.appExc.AccountException;
import com.pbl.flightapp.appExc.NotFoundException;
import com.pbl.flightapp.appExc.PermissionException;
import com.pbl.flightapp.appExc.UserException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Bắt các lỗi cụ thể trước (ưu tiên)
    @ExceptionHandler(AccountException.class)
    public ResponseEntity<?> handleAccountException(AccountException e) {
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        error.put("code", e.getCode());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<?> handleUserException(UserException e) {
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        error.put("code", e.getCode());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Bắt tất cả các lỗi còn lại
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAllExceptions(Exception e) {
        Map<String, String> error = new HashMap<>();
        error.put("message",e.getMessage());
        error.put("code", "UNKNOWN_ERROR");
        // In log hoặc stacktrace để tiện debug
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<?> handlePermissionException(PermissionException e) {
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        error.put("code", e.getErrorCode());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(NotFoundException e) {
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        error.put("code", e.getCode());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
