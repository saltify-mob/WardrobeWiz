package se.saltify.backend.clothing;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import se.saltify.backend.clothing.dto.*;
import se.saltify.backend.clothing.service.ClothingService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin
@RequestMapping("/api/clothings")
public class ClothingController {
    private final ClothingService clothingService;
    private final String userIdHeader = "ww-user-id";

    public ClothingController(ClothingService clothingService) {
        this.clothingService = clothingService;
    }

    @GetMapping
    ResponseEntity<List<ClothingResponseDto>> findAll(@RequestHeader(userIdHeader) String userId, @RequestParam(required = false) String location) {
       if(location == null){
           return ResponseEntity.ok(clothingService.findAll(userId));
       } return ResponseEntity.ok(clothingService.findAllByLocationAndUserId(userId, location));
    }

    @GetMapping("/{id}")
    ResponseEntity<ClothingResponseDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(clothingService.findById(id));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteClothingById(@PathVariable String id) {
        clothingService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<ClothingResponseDto> createClothing(
            @RequestHeader("ww-user-id") String userId,
            @RequestPart("image") MultipartFile image,
            @RequestPart("season") String season,
            @RequestPart("color") String color,
            @RequestPart("category") String category,
            @RequestPart("type") String type,
            @RequestPart("dateOfPurchase") String dateOfPurchase,
            @RequestPart("timeLastUsed") String timeLastUsed,
            @RequestPart("location") String location
    ) {
        ClothingCreateRequestDto dto = new ClothingCreateRequestDto(image, userId, category, type, season, color, dateOfPurchase, timeLastUsed, location);

        return ResponseEntity.ok().body(clothingService.createClothing(dto));
    }

    @GetMapping("/generate")
    ResponseEntity<ClothingGenerateResponseDto> generateClothing(@RequestHeader(userIdHeader) String userId, @RequestParam("temp") double temp) {
        System.out.println(temp);
        return ResponseEntity.ok(clothingService.generateClothing(userId, temp));
    }

    @GetMapping("/wardrobe")
    public ResponseEntity<List<ClothingResponseDto>> getWardrobeForUser(@RequestHeader(userIdHeader) String userId) {
        return ResponseEntity.ok(clothingService.getWardrobeForUser(userId));
    }

    @PutMapping("/{id}")
  ResponseEntity <ClothingResponseDto> updateClothing(@PathVariable String id, @RequestBody ClothingUpdateRequestDto dto) {
        return ResponseEntity.ok(clothingService.updateClothing(id, dto));
    }

    @ExceptionHandler({NoSuchElementException.class})
    private ResponseEntity<String> handleNoSuchElementExceptionException(NoSuchElementException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
