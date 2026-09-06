package com.pbl.flightapp.appExc;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class UserException extends RuntimeException {
    private String code;

    private static Map<String, String> notices;

    static {
        Map<String, String> temp = new HashMap<>();
        temp.put("EMAIL_IS_EXIST", "Email đã tồn tại.");
        temp.put("NUMBER_PHONE_IS_EXIST", "Số điện thoại đã tồn tại");
        temp.put("CARD_NUMBER_IS_EXIST", "Card number đã tồn tại");

        // Bọc lại thành map không thể chỉnh sửa
        notices = Collections.unmodifiableMap(temp);
    }

    public UserException(String message, String code) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static Map<String, String> getNotices() {
        return notices;
    }
}
