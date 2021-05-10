package io.wanderingthinkter.DigiWallet.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.wanderingthinkter.DigiWallet.models.ACCOUNT_TYPE;
import io.wanderingthinkter.DigiWallet.models.Account;
import io.wanderingthinkter.DigiWallet.models.AppUser;
import io.wanderingthinkter.DigiWallet.models.Transaction;
import io.wanderingthinkter.DigiWallet.services.AppUserService;
import io.wanderingthinkter.DigiWallet.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AppUserService appUserService;

    @PostMapping("/create_account")
    public Account createAccount(@RequestParam ACCOUNT_TYPE account_type, Principal principal) {
        Optional<AppUser> optionalAppUser = appUserService.findByPrincipal(principal);
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            return transactionService.createAccount(appUser.getId(), account_type);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "user not found");
        }
    }

    @PostMapping("/add_money")
    public Account addAmountToAccount(@RequestParam Long amount, Principal principal) {
        Optional<AppUser> optionalAppUser = appUserService.findByPrincipal(principal);
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            return transactionService.addAmountToAccount(amount, appUser.getId());
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "user not found");
        }
    }

    @PostMapping()
    public Transaction createTransaction(@RequestBody Transaction transaction, Principal principal) throws JsonProcessingException {
        Optional<AppUser> optionalAppUser = appUserService.findByPrincipal(principal);
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            return transactionService.createTransaction(transaction, appUser.getId());
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "user not found");
        }
    }

    @GetMapping()
    public List<Transaction> getAllTransactions(Principal principal) {
        Optional<AppUser> optionalAppUser = appUserService.findByPrincipal(principal);
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            return transactionService.getAllTransactions(appUser.getId());
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "user not found");
        }
    }

    @PostMapping("/{id}/cancel")
    public Transaction cancelTransaction(@PathVariable Long id, Principal principal) {
        Optional<AppUser> optionalAppUser = appUserService.findByPrincipal(principal);
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            return transactionService.cancelTransaction(id, appUser.getId());
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "user not found");
        }
    }

}
