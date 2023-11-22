package se.saltify.backend.clothing.dto;

import se.saltify.backend.clothing.Clothing;

public record ClothingGenerateResponseDto(Clothing headwear, Clothing top, Clothing lowerGarment) {
}
