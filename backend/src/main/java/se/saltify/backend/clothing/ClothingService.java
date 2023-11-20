package se.saltify.backend.clothing;

import org.springframework.stereotype.Service;

import se.saltify.backend.user.UserRepository;

import java.util.List;

@Service
public class ClothingService {
    private final ClothingRepository clothingRepository;

    private final UserRepository userRepository;

    public ClothingService(ClothingRepository clothingRepository, UserRepository userRepository) {
        this.clothingRepository = clothingRepository;
        this.userRepository = userRepository;
    }

    public List<ClothingResponseDto> findAll() {

    public ClothingService(ClothingRepository clothingRepository) {
        this.clothingRepository = clothingRepository;
    }


   public List<ClothingResponseDto> findAll() {

        return clothingRepository.findAll().stream().map(c -> new ClothingResponseDto(
                c.getId(),
                c.getType(),
                c.getSeason(),
                c.getColor(),
                c.getDateOfPurchase(),
                c.getTimeLastUsed()
        )).toList();
    }

    public ClothingResponseDto findById(String id) {
        return clothingRepository.findById(id).map(c -> new ClothingResponseDto(
                c.getId(),
                c.getType(),
                c.getSeason(),
                c.getColor(),
                c.getDateOfPurchase(),
                c.getTimeLastUsed()
        )).orElseThrow();
    }
}
