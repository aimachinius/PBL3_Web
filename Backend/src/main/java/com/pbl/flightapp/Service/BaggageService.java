package com.pbl.flightapp.Service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.pbl.flightapp.Repository.BaggageRepo;
import com.pbl.flightapp.Model.Baggage;
import java.util.List;
import com.pbl.flightapp.Enum.TypeBaggage;

@Service
public class BaggageService {
    @Autowired
    private BaggageRepo baggageRepo;

    public BaggageService(BaggageRepo baggageRepo) {
        this.baggageRepo = baggageRepo;
    }

    public BaggageService() {
    }

    public List<Baggage> getAllBaggage() {
        return baggageRepo.findAll();
    }

    public Baggage getBaggageById(int idBaggage) {
        return baggageRepo.findByIdBaggage(idBaggage);
    }

    public List<Baggage> getBaggageByType(TypeBaggage baggageType) {
        return baggageRepo.findByBaggageType(baggageType);
    }

    public void addBaggage(Baggage baggage) {
        if (!baggageRepo.existsById(baggage.getIdBaggage())) {
            baggageRepo.save(baggage);
        }
    }

    public void deleteBaggage(int idBaggage) {
        if (baggageRepo.existsById(idBaggage)) {
            baggageRepo.deleteById(idBaggage);
        }
    }

    public void updateBaggage(Baggage baggage) {
        if (baggageRepo.existsById(baggage.getIdBaggage())) {
            Baggage exist = baggageRepo.findByIdBaggage(baggage.getIdBaggage());
            exist.Copy(baggage);
            baggageRepo.save(exist);
        } else {
            addBaggage(baggage);
        }
    }
}
