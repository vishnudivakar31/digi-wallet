package io.wanderingthinkter.DigiWallet.services;

import io.wanderingthinkter.DigiWallet.models.AppUser;
import io.wanderingthinkter.DigiWallet.repos.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> optionalAppUser = appUserRepository.findByUsername(username);
        if (optionalAppUser.isPresent()) {
            AppUser appUser = optionalAppUser.get();
            return new User(appUser.getUsername(), appUser.getPassword(), Collections.emptyList());
        }
        throw new UsernameNotFoundException(username);
    }
}
