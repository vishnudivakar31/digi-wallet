package io.wanderingthinkter.DigiWallet.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transaction")
@Getter
@Setter
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderID;
    private Long receiverID;
    private Long amount;
    private Long latitude;
    private Long longitude;
    private TRANSACTION_STATUS transaction_status;
    private Date transactionDate;
    private Date updatedDate;

    public Transaction(Long id, Long senderID, Long receiverID, Long amount, Long latitude, Long longitude,
                       TRANSACTION_STATUS transaction_status, Date transactionDate, Date updatedDate) {
        this.id = id;
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.amount = amount;
        this.latitude = latitude;
        this.longitude = longitude;
        this.transaction_status = transaction_status;
        this.transactionDate = transactionDate;
        this.updatedDate = updatedDate;
    }

    public Transaction(Long senderID, Long receiverID, Long amount, Long latitude, Long longitude,
                       TRANSACTION_STATUS transaction_status, Date transactionDate, Date updatedDate) {
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.amount = amount;
        this.latitude = latitude;
        this.longitude = longitude;
        this.transaction_status = transaction_status;
        this.transactionDate = transactionDate;
        this.updatedDate = updatedDate;
    }
}
