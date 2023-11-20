package se.saltify.backend.clothing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
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

     @GetMapping("/{id}")
    ResponseEntity<ClothingResponseDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(clothingService.findById(id));
     }
}
