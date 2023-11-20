package se.saltify.backend.clothing;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClothingService {
    private final ClothingRepository clothingRepository;

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
}
