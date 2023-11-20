package se.saltify.backend.clothing;

import org.springframework.stereotype.Service;
import se.saltify.backend.user.User;
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
        return clothingRepository.findAll().stream().map(this::mapToDto).toList();
    }

    public ClothingResponseDto findById(String id) {
        return clothingRepository.findById(id).map(this::mapToDto).orElseThrow();
    }

    public ClothingResponseDto createClothing(ClothingRequestDto dto) {
        User user = userRepository.findById(dto.userId()).orElseThrow();
        Clothing cloth = new Clothing(user, dto.color(), dto.type(), dto.season(), dto.dateOfPurchase(), dto.timeLastUsed());
        clothingRepository.save(cloth);
        return mapToDto(cloth);
    }

    private ClothingResponseDto mapToDto(Clothing c) {
        return new ClothingResponseDto(
                c.getId(),
                c.getType(),
                c.getSeason(),
                c.getColor(),
                c.getDateOfPurchase(),
                c.getTimeLastUsed());
    }
}
