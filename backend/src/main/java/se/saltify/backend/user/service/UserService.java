package se.saltify.backend.user.service;

import org.springframework.stereotype.Service;
import se.saltify.backend.user.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
