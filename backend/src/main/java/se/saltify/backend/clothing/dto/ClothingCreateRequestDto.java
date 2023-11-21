package se.saltify.backend.clothing.dto;

import org.springframework.web.multipart.MultipartFile;

public record ClothingCreateRequestDto(MultipartFile image, String userId, String type, String season, String color, String dateOfPurchase, String timeLastUsed) {
}
