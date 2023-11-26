package se.saltify.backend.clothing.dto;

public record ClothingUpdateRequestDto(String category, String type, String season, String color, String dateOfPurchase, String timeLastUsed, String location) {
}
