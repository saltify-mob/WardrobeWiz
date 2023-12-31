package se.saltify.backend.clothing.service;

import org.springframework.stereotype.Service;
import se.saltify.backend.clothing.Clothing;
import se.saltify.backend.clothing.ClothingRepository;
import se.saltify.backend.clothing.dto.*;
import se.saltify.backend.user.User;
import se.saltify.backend.user.UserRepository;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Random;
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

    public List<ClothingResponseDto> findAll(String userId) {
        return clothingRepository.findClothingsForUser(userId).stream().map(this::mapToDto).toList();
    }

    public List<ClothingResponseDto> findAllByLocationAndUserId(String userId, String location) {
        return clothingRepository.findClothingsForUserAndLocation(userId, location).stream().map(this::mapToDto).toList();
    }

    public ClothingResponseDto findById(String id) {
        return clothingRepository.findById(id).map(this::mapToDto).orElseThrow();
    }

    public ClothingResponseDto createClothing(ClothingCreateRequestDto dto) {
        User user = userRepository.findById(dto.userId()).orElseThrow();

        String imageKey = "clothing-image-" + UUID.randomUUID();
        System.out.println("YO" + imageKey);
        String imageUrl = azureBlobStorageService.uploadImage(dto.image(), imageKey);

        Clothing cloth = new Clothing(user, dto.category(), dto.type(), dto.season(), dto.color(), dto.dateOfPurchase(), dto.timeLastUsed(), imageUrl, imageKey, dto.location());
        clothingRepository.save(cloth);
        return mapToDto(cloth);
    }

    public ClothingGenerateResponseDto generateClothing(String userId, double temp) {
        List<Clothing> clothing = clothingRepository.findClothingsForUserAndSeason(userId, determineSeason(temp));

        List<Clothing> headWears = clothing.stream()
                .filter(c -> c.getCategory().equals("headwear"))
                .filter(c -> c.getLocation().equals("wardrobe"))
                .toList();

        List<Clothing> tops = clothing.stream()
                .filter(c -> c.getCategory().equals("top"))
                .filter(c -> c.getLocation().equals("wardrobe"))
                .toList();

        List<Clothing> lowerGarments = clothing.stream()
                .filter(c -> c.getCategory().equals("lowerGarment"))
                .filter(c -> c.getLocation().equals("wardrobe"))
                .toList();

        Random r = new Random();
        Clothing randomHeadwear = headWears.stream().skip(r.nextInt(headWears.size())).findFirst().orElseThrow();
        Clothing randomTop = tops.stream().skip(r.nextInt(tops.size())).findFirst().orElseThrow();
        Clothing randomlowerGarment = lowerGarments.stream().skip(r.nextInt(lowerGarments.size())).findFirst().orElseThrow();

        return new ClothingGenerateResponseDto(randomHeadwear, randomTop, randomlowerGarment);
    }

    public List<ClothingResponseDto> getWardrobeForUser(String userId) {
        List<Clothing> clothing = clothingRepository.findClothingsForUser(userId);
        return clothing.stream().map(this::mapToDto).toList();
    }

    public ClothingResponseDto updateClothing(String id, ClothingUpdateRequestDto dto) {
        Clothing clothing = clothingRepository.findById(id).orElseThrow();
        clothing.setType(dto.type());
        clothing.setSeason(dto.season());
        clothing.setColor(dto.color());
        clothing.setCategory(dto.category());
        clothing.setTimeLastUsed(dto.timeLastUsed());
        clothing.setDateOfPurchase(dto.dateOfPurchase());
        clothing.setLocation(dto.location());
        clothingRepository.save(clothing);
        return mapToDto(clothing);
    }

    private ClothingResponseDto mapToDto(Clothing c) {
        return new ClothingResponseDto(
                c.getId(),
                c.getCategory(),
                c.getType(),
                c.getSeason(),
                c.getColor(),
                c.getDateOfPurchase(),
                c.getTimeLastUsed(),
                c.getImageUrl(),
                c.getLocation()
        );

    }

    public void deleteById(String id) {
        Clothing clothing = clothingRepository.findById(id).orElseThrow();

        String imageKey = clothing.getimageKey();

        azureBlobStorageService.deleteImage(imageKey);

        clothingRepository.deleteById(id);
    }

    private String determineSeason(double temp) {
        if (temp >= 25) {
            return "summer";
        } else if (temp >= 10) {
            Month currentMonth = LocalDate.now().getMonth();
            int monthValue = currentMonth.getValue();
            if (monthValue >= Month.JANUARY.getValue() && monthValue <= Month.JUNE.getValue()) {
                return "spring";
            } else return "autumn";
        } else {
            return "winter";
        }
    }
}
