package com.example.demo.Enum;

public enum CustomerCategory {
    INFANT("Trẻ em dưới 2 tuổi"),
    CHILD("Trẻ em"),
    ADULT("Người lớn");

    private final String description;

    CustomerCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}