package com.example.demo.Enum;

public enum PaymentMethod {
    CASH("Tiền mặt"),
    CREDIT_CARD("Thẻ tín dụng"),
    DEBIT_CARD("Thẻ ghi nợ"),
    BANK_TRANSFER("Chuyển khoản"),
    E_WALLET("Ví điện tử"),
    QR_CODE("Thanh toán QR");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
