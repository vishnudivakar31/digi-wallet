package io.wanderingthinkter.DigiWallet.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.wanderingthinkter.DigiWallet.models.ACCOUNT_TYPE;
import io.wanderingthinkter.DigiWallet.models.Account;
import io.wanderingthinkter.DigiWallet.models.TRANSACTION_STATUS;
import io.wanderingthinkter.DigiWallet.models.Transaction;
import io.wanderingthinkter.DigiWallet.repos.AccountRepository;
import io.wanderingthinkter.DigiWallet.repos.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private KafkaService kafkaService;

    @Value(value = "${kafka.topicName}")
    private String topicName;

    public Account createAccount(Long userID, ACCOUNT_TYPE account_type) {
        Account account = new Account(account_type, 0L, userID);
        return accountRepository.save(account);
    }

    public Account addAmountToAccount(Long amount, Long userID) {
        Optional<Account> optionalAccount = accountRepository.findByUserID(userID);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setBalance(account.getBalance() + amount);
            return accountRepository.save(account);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "account not created. create account first");
        }
    }

    public Transaction createTransaction(Transaction transaction, Long userID) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        transaction.setSenderID(userID);
        transaction.setTransactionDate(new Date());
        transaction.setTransaction_status(TRANSACTION_STATUS.PENDING);
        transaction = transactionRepository.save(transaction);
        kafkaService.sendMessage(topicName, objectMapper.writeValueAsString(transaction));
        return transaction;
    }

    public List<Transaction> getAllTransactions(Long userID) {
        return transactionRepository.getAllTransaction(userID);
    }

    public Transaction cancelTransaction(Long transactionID, Long userID) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionID);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            if (transaction.getSenderID() != userID || transaction.getTransaction_status() == TRANSACTION_STATUS.CANCELLED) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "transaction is not owned by user or transaction is already cancelled");
            }
            transaction.setTransaction_status(TRANSACTION_STATUS.CANCELLED);
            transaction.setUpdatedDate(new Date());
            return transactionRepository.save(transaction);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "transaction not found");
        }
    }
}
