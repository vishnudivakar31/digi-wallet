package io.wanderingthinkter.DigiWallet.repos;

import io.wanderingthinkter.DigiWallet.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUserID(Long userID);
}
