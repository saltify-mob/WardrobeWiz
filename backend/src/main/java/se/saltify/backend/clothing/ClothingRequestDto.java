package se.saltify.backend.clothing;

public record ClothingRequestDto(String userId, String type, String season, String color, String dateOfPurchase, String timeLastUsed) {
}
