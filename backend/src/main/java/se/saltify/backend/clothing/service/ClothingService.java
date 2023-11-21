package se.saltify.backend.clothing.service;

import org.springframework.stereotype.Service;
import se.saltify.backend.clothing.Clothing;
import se.saltify.backend.clothing.ClothingRepository;
import se.saltify.backend.clothing.dto.ClothingCreateRequestDto;
import se.saltify.backend.clothing.dto.ClothingRequestDto;
import se.saltify.backend.clothing.dto.ClothingResponseDto;
import se.saltify.backend.user.User;
import se.saltify.backend.user.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ClothingService {
    private final ClothingRepository clothingRepository;

    private final UserRepository userRepository;

    private final AzureBlobStorageService azureBlobStorageService;

    public ClothingService(ClothingRepository clothingRepository, UserRepository userRepository, AzureBlobStorageService azureBlobStorageService) {
        this.clothingRepository = clothingRepository;
        this.userRepository = userRepository;
        this.azureBlobStorageService = azureBlobStorageService;
    }

    public List<ClothingResponseDto> findAll() {
        return clothingRepository.findAll().stream().map(this::mapToDto).toList();
    }

    public ClothingResponseDto findById(String id) {
        return clothingRepository.findById(id).map(this::mapToDto).orElseThrow();
    }

    public ClothingResponseDto createClothing(ClothingCreateRequestDto dto) {
        User user = userRepository.findById(dto.userId()).orElseThrow();

        String imageKey = "clothing-image-" +  UUID.randomUUID();
        System.out.println("YO" + imageKey);
        String imageUrl = azureBlobStorageService.uploadImage(dto.image(), imageKey);

        Clothing cloth = new Clothing(user, dto.type(), dto.season(), dto.color(), dto.dateOfPurchase(), dto.timeLastUsed(), imageUrl, imageKey);
        clothingRepository.save(cloth);
        return mapToDto(cloth);
    }

    public ClothingResponseDto updateClothing(String id, ClothingRequestDto dto) {
        Clothing clothing = clothingRepository.findById(id).orElseThrow();
        clothing.setType(dto.type());
        clothing.setSeason(dto.season());
        clothing.setColor(dto.color());
        clothing.setDateOfPurchase(dto.dateOfPurchase());
        clothing.setTimeLastUsed(dto.timeLastUsed());
        clothingRepository.save(clothing);
        return mapToDto(clothing);
    }

    private ClothingResponseDto mapToDto(Clothing c) {
        return new ClothingResponseDto(
                c.getId(),
                c.getType(),
                c.getSeason(),
                c.getColor(),
                c.getDateOfPurchase(),
                c.getTimeLastUsed(),
        c.getImageUrl());

    }

    public void deleteById(String id) {
        Clothing clothing = clothingRepository.findById(id).orElseThrow();

        String imageKey = clothing.getimageKey();

        azureBlobStorageService.deleteImage(imageKey);

        clothingRepository.deleteById(id);
    }
}
