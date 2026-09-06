package com.pbl.flightapp.Repository;

import com.pbl.flightapp.DTO.AccountDTO;
import com.pbl.flightapp.Model.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {
    Account findByUsername(String username);
//    Account findByUsername(String username);
@Query("SELECT new com.pbl.flightapp.DTO.AccountDTO(a.idAccount, a.username, a.password, a.createdAt, a.role, null) " +
        "FROM Account a " +
        "LEFT JOIN a.role r " +
        "WHERE (:username IS NULL OR a.username = :username) " +
        "AND (:roleId IS NULL OR r.id = :roleId)")
List<AccountDTO> findAccountDTOs(@Param("username") String username, @Param("roleId") Integer roleId);
//        "WHERE (:username IS NULL OR a.username = :username) " )
//        "AND (:roleId IS NULL OR (a.role IS NOT NULL AND a.role.id = :roleId))")

//
//    Account findByUsernameAndPassword(String username, String password);

//    Account findByCustomer(Customer customer);
}
