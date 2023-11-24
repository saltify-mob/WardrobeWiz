package se.saltify.backend.user.service;

import org.springframework.stereotype.Service;
import se.saltify.backend.user.User;
import se.saltify.backend.user.UserRepository;
import se.saltify.backend.user.UserRequestDto;
import se.saltify.backend.user.UserResponseDto;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getById(String id){
        return userRepository.findById(id).orElseThrow();
    }

    public User addUser(UserRequestDto user){
        return userRepository.save(new User(user.id(), user.firstName(), user.lastName()));
    }

    public void deleteUserById(String id){
        userRepository.deleteById(id);
    }

}
