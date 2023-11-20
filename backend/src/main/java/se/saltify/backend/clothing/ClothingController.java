package se.saltify.backend.clothing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clothings")
public class ClothingController {
    private final ClothingService clothingService;

    public ClothingController(ClothingService clothingService) {
        this.clothingService = clothingService;
    }

    @GetMapping
    ResponseEntity<List<ClothingResponseDto>> findAll() {
        return ResponseEntity.ok(clothingService.findAll());
     }
}
