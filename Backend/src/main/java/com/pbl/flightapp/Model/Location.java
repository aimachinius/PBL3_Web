package com.pbl.flightapp.Model;

import jakarta.persistence.*;

@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String nameCode;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameCode() {
        return nameCode;
    }

    public void setNameCode(String nameCode) {
        this.nameCode = nameCode;
    }
    public Location() {
    }
    public Location(String nameCode, String name) {
        this.nameCode = nameCode;
            
        this.name = name; 
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
