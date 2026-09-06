package com.pbl.flightapp.appExc;

public class LoginFailedException extends RuntimeException {
    private String code;
    public LoginFailedException(String message, Throwable cause, String code) {
        super(message, cause);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
