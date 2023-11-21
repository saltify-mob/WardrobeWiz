package se.saltify.backend.clothing;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import se.saltify.backend.clothing.dto.ClothingCreateRequestDto;
import se.saltify.backend.clothing.dto.ClothingRequestDto;
import se.saltify.backend.clothing.dto.ClothingResponseDto;
import se.saltify.backend.clothing.service.ClothingService;

import java.util.List;
import java.util.NoSuchElementException;

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

    @PutMapping("/{id}")
    ResponseEntity<ClothingResponseDto> updateClothing(@PathVariable String id, @RequestBody ClothingRequestDto dto) {
        return ResponseEntity.ok(clothingService.updateClothing(id, dto));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteClothingById(@PathVariable String id) {
        clothingService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<ClothingResponseDto> createClothing(@RequestPart("image") MultipartFile image,
                                               @RequestPart("season") String season,
                                               @RequestPart("color") String color,
                                               @RequestPart("userId") String userId,
                                               @RequestPart("type") String type,
                                               @RequestPart("dateOfPurchase") String dateOfPurchase,
                                               @RequestPart("timeLastUsed") String timeLastUsed
    ) {
        ClothingCreateRequestDto dto = new ClothingCreateRequestDto(image, userId, type, season, color, dateOfPurchase, timeLastUsed);

        return ResponseEntity.ok().body(clothingService.createClothing(dto));
    }

    @ExceptionHandler({NoSuchElementException.class})
    private ResponseEntity<String> handleNoSuchElementExceptionException(NoSuchElementException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
