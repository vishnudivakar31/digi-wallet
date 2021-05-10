package io.wanderingthinkter.DigiWallet.services;

import io.wanderingthinkter.DigiWallet.models.AppUser;
import io.wanderingthinkter.DigiWallet.repos.AppUserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
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

    public AppUser save(AppUser appUser) {
        try {
            AppUser savedUser = appUserRepository.save(appUser);
            if (savedUser == null) {
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "username exists");
            }
            return savedUser;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public Optional<AppUser> findByPrincipal(Principal principal) {
        String username = principal.getName();
        return appUserRepository.findByUsername(username);
    }
}
