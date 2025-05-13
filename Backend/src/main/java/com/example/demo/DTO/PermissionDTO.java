package com.example.demo.DTO;

public class PermissionDTO {
    private String name;
    private String description;

    public PermissionDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
