package com.pbl.flightapp.Enum;

public enum Permission {
    VIEW_TAI_KHOANG("Xem tài khoản"),
    EDIT_TAI_KHOANG("Chỉnh sửa tài khoản"),
    VIEW_QUYEN_TRUY_CAP("Xem quyền truy cập"),
    EDIT_QUYEN_TRUY_CAP("Chỉnh sửa quyền truy cập"),
    VIEW_NGUOI_DUNG("Xem người dùng"),
    EDIT_NGUOI_DUNG("Chỉnh sửa người dùng"),
    VIEW_MAY_BAY("Xem máy bay"),
    EDIT_MAY_BAY("Chỉnh sửa máy bay"),
    VIEW_CHUYEN_BAY("Xem chuyến bay"),
    EDIT_CHUYEN_BAY("Chỉnh sửa chuyến bay");

    private final String description;

    Permission(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
