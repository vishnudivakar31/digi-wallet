package io.wanderingthinkter.DigiWallet.jobs;

import io.wanderingthinkter.DigiWallet.models.Account;
import io.wanderingthinkter.DigiWallet.models.AppUser;
import io.wanderingthinkter.DigiWallet.models.TRANSACTION_STATUS;
import io.wanderingthinkter.DigiWallet.models.Transaction;
import io.wanderingthinkter.DigiWallet.services.AppUserService;
import io.wanderingthinkter.DigiWallet.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Configuration
@EnableScheduling
public class TransactionApproverJob {
    @Autowired
    private AppUserService appUserService;

    @Autowired
    private TransactionService transactionService;

    @Scheduled(cron = "0 0/15 * * * ?")
    public void approvePendingTransactions() {
        Date today = new Date();
        System.out.println("transaction approval job started: " + today);

        List<Transaction> transactionList = transactionService.getAllPendingTransactions();
        System.out.println("total number of transactions: " + transactionList.size());

        List<Transaction> agedTransactions = transactionList
                .stream()
                .filter(transaction -> subtractDates(transaction.getTransactionDate(), today) > 24)
                .collect(Collectors.toList());
        System.out.println("total number of aged transactions: " + agedTransactions.size());

        for (Transaction transaction : agedTransactions) {
            Optional<AppUser> optionalSender = appUserService.findUserByID(transaction.getSenderID());
            Optional<AppUser> optionalReceiver = appUserService.findUserByID(transaction.getReceiverID());
            if (!optionalReceiver.isPresent() || !optionalSender.isPresent()) {
                commitTransaction(transaction, "receiver or sender not valid", TRANSACTION_STATUS.CANCELLED);
            } else {
                processTransaction(transaction, optionalSender.get(), optionalReceiver.get());
            }
        }
    }

    private void processTransaction(Transaction transaction, AppUser sender, AppUser receiver) {
        Optional<Account> optionalSenderAccount = transactionService.getAccountByUserID(sender.getId());
        Optional<Account> optionalReceiverAccount = transactionService.getAccountByUserID(receiver.getId());

        if (!optionalReceiverAccount.isPresent() || !optionalSenderAccount.isPresent()) {
            commitTransaction(transaction, "users have not created account", TRANSACTION_STATUS.CANCELLED);
        } else {
            Account senderAccount = optionalSenderAccount.get();
            Account receiverAccount = optionalReceiverAccount.get();
            if (senderAccount.getBalance() >= transaction.getAmount()) {
                processPayment(senderAccount, receiverAccount, transaction);
            } else {
                commitTransaction(transaction, "insufficient balance", TRANSACTION_STATUS.CANCELLED);
            }
        }
    }

    private void processPayment(Account senderAccount, Account receiverAccount, Transaction transaction) {
        Long amount = transaction.getAmount();
        transactionService.addAmountToAccount(-amount, senderAccount.getUserID());
        transactionService.addAmountToAccount(amount, receiverAccount.getUserID());
        commitTransaction(transaction, "approved", TRANSACTION_STATUS.APPROVED);
    }

    private long subtractDates(Date from, Date to) {
        return ((to.getTime() - from.getTime()) / 1000) / 3600;
    }

    private void commitTransaction(Transaction transaction, String message, TRANSACTION_STATUS transaction_status) {
        transaction.setTransaction_status(transaction_status);
        transaction.setStatusMessage(message);
        transaction.setUpdatedDate(new Date());
        transactionService.updateTransaction(transaction);
    }
}
