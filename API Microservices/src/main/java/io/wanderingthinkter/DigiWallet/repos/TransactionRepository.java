package io.wanderingthinkter.DigiWallet.repos;

import io.wanderingthinkter.DigiWallet.models.TRANSACTION_STATUS;
import io.wanderingthinkter.DigiWallet.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query(value = "SELECT * FROM TRANSACTION WHERE senderID = ?1 OR receiverID = ?1 ORDER BY transaction.transaction_date DESC",
            nativeQuery = true)
    List<Transaction> getAllTransaction(Long userID);

    @Query(value = "SELECT * FROM TRANSACTION WHERE TRANSACTION_STATUS = ?1 OR TRANSACTION_STATUS = ?2 ORDER BY transaction.transaction_date DESC",
    nativeQuery = true)
    List<Transaction> findAllPendingTransactions(int pending, int fraudDetected);
}
