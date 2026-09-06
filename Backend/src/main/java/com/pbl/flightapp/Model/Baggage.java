package com.pbl.flightapp.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import com.pbl.flightapp.Enum.TypeBaggage;

@Entity
@Table(name = "Baggage")
public class Baggage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Baggage")
    private int idBaggage;

    @Column(name = "Baggage_Type")
    private String baggageType;

    @Column(name = "Baggage_Weight")
    private float baggageWeight;

    public Baggage() {
    }

    public Baggage(int idBaggage, TypeBaggage baggageType, float baggageWeight) {
        this.idBaggage = idBaggage;
        this.baggageType = baggageType.toString();
        this.baggageWeight = baggageWeight;
    }

    public int getKey() {
        return idBaggage;
    }

    public List<String> valueString() {
        List<String> value = new ArrayList<>();
        value.add(baggageType.toString());
        value.add(String.valueOf(baggageWeight));
        return value;
    }

    public int getIdBaggage() {
        return idBaggage;
    }

    public void setIdBaggage(int idBaggage) {
        this.idBaggage = idBaggage;
    }

    public TypeBaggage getBaggageType() {
        return TypeBaggage.valueOf(baggageType);
    }

    public void setBaggageType(TypeBaggage baggageType) {
        this.baggageType = baggageType.toString();
    }

    public float getBaggageWeight() {
        return baggageWeight;
    }

    public void setBaggageWeight(float baggageWeight) {
        this.baggageWeight = baggageWeight;
    }

    @Override
    public String toString() {
        return "Baggage{" +
                "idBaggage=" + idBaggage +
                ", baggageType=" + baggageType +
                ", baggageWeight=" + baggageWeight +
                '}';
    }

    public void Copy(Baggage baggage) {
        this.baggageType = baggage.getBaggageType().toString();
        this.baggageWeight = baggage.getBaggageWeight();
    }
}
