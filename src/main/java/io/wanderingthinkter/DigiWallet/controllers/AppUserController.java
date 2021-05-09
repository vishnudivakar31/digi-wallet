package io.wanderingthinkter.DigiWallet.controllers;

import io.wanderingthinkter.DigiWallet.models.AppUser;
import io.wanderingthinkter.DigiWallet.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/sign-up")
    public AppUser signUp(@RequestBody AppUser appUser) {
        appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
        return appUserService.save(appUser);
    }

    @GetMapping
    public AppUser getAppUser(Principal principal) {
        Optional<AppUser> optionalAppUser = appUserService.findByPrincipal(principal);
        if (optionalAppUser.isPresent()) {
            return optionalAppUser.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "account not found");
    }
}
