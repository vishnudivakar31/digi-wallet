package io.wanderingthinkter.DigiWallet.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
@Getter @Setter @NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private ACCOUNT_TYPE account_type;
    private Long balance;
    private Long userID;

    @OneToOne(mappedBy = "AppUser")
    private AppUser appUser;

    public Account(Long id, ACCOUNT_TYPE account_type, Long balance, Long userID, AppUser appUser) {
        this.id = id;
        this.account_type = account_type;
        this.balance = balance;
        this.userID = userID;
        this.appUser = appUser;
    }

    public Account(Long id, ACCOUNT_TYPE account_type, Long balance, Long userID) {
        this.id = id;
        this.account_type = account_type;
        this.balance = balance;
        this.userID = userID;
    }
}
