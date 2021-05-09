package io.wanderingthinkter.DigiWallet.services;

import io.wanderingthinkter.DigiWallet.models.ACCOUNT_TYPE;
import io.wanderingthinkter.DigiWallet.models.Account;
import io.wanderingthinkter.DigiWallet.repos.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private AccountRepository accountRepository;

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
}
