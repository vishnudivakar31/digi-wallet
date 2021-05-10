package io.wanderingthinkter.DigiWallet.repos;

import io.wanderingthinkter.DigiWallet.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query(value = "SELECT * FROM TRANSACTION WHERE senderID = ?1 OR receiverID = ?1 ORDER BY transaction.transaction_date DESC",
            nativeQuery = true)
    List<Transaction> getAllTransaction(Long userID);
}
