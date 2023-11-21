package se.saltify.backend.clothing.dto;

public record ClothingResponseDto(String id, String type, String season, String color, String dateOfPurchase, String timeLastUsed, String imageUrl) {
}
