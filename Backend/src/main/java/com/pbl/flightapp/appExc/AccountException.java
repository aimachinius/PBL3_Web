package com.pbl.flightapp.appExc;

public class AccountException extends RuntimeException {
    String code;
    public AccountException(String message, String code) {
        super(message);
        this.code = code;
    }
    public String getCode() {
        return code;
    }
}
