package io.wanderingthinkter.digiwalletfrauddetection.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.wanderingthinkter.digiwalletfrauddetection.models.AppUser;
import io.wanderingthinkter.digiwalletfrauddetection.models.TRANSACTION_STATUS;
import io.wanderingthinkter.digiwalletfrauddetection.models.Transaction;
import io.wanderingthinkter.digiwalletfrauddetection.repos.AppUserRepository;
import io.wanderingthinkter.digiwalletfrauddetection.repos.TransactionRepository;
import io.wanderingthinkter.digiwalletfrauddetection.utils.GeoDistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

@Component
public class KafkaConsumer {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private GeoDistanceCalculator geoDistanceCalculator;

    @KafkaListener(topics = "${kafka.topicName}")
    public void listenToTransaction(String transactionJson) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Transaction transaction = objectMapper.readValue(transactionJson, Transaction.class);
        System.out.println("new transaction consumed, ID: " + transaction.getId());
        Optional<AppUser> optionalAppUser = appUserRepository.findById(transaction.getSenderID());
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            double distance = geoDistanceCalculator.distance(appUser.getLatitude(), appUser.getLongitude(),
                    transaction.getLatitude(), transaction.getLongitude());
            if (distance > 100) {
                transaction.setTransaction_status(TRANSACTION_STATUS.FRAUD_DETECTED);
                transaction.setUpdatedDate(new Date());
                transactionRepository.save(transaction);
            }
        }
    }
}
