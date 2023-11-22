package se.saltify.backend.clothing.dto;

import se.saltify.backend.clothing.Clothing;

public record ClothingGenerateResponseDto(String id, Clothing headwear, Clothing top, Clothing lowerGarment) {
}
