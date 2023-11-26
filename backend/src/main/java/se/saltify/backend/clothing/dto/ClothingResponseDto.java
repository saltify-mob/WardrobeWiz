package se.saltify.backend.clothing.dto;

public record ClothingResponseDto(String id, String category, String type, String season, String color, String dateOfPurchase, String timeLastUsed, String imageUrl, String location) {
}
