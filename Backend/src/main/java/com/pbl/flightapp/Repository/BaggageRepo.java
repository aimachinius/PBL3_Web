package com.pbl.flightapp.Repository;

import com.pbl.flightapp.Model.Baggage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pbl.flightapp.Enum.TypeBaggage;
/*
 * Table Baggage {
  Id_Baggage string [primary key]
  Baggage_Type enum('Carry-on baggage', 'Special baggage', 'Checked baggage') 
  Baggage_Weight float
}
 */

@Repository
public interface BaggageRepo extends JpaRepository<Baggage, Integer> {
  Baggage findByIdBaggage(int idBaggage);

  List<Baggage> findByBaggageType(TypeBaggage baggage_Type);

}
