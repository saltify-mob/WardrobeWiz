package se.saltify.backend.clothing;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingRepository extends ListCrudRepository<Clothing, String> {

    @Query("SELECT c FROM Clothing c WHERE c.user.id = :userId")
    List<Clothing> findClothingsForUser(String userId);

    @Query("SELECT c FROM Clothing c WHERE c.user.id = :userId AND c.season = :season")
    List<Clothing> findClothingsForUserAndSeason(String userId, String season);

    @Query("SELECT c FROM Clothing c WHERE c.user.id = :userId AND c.location = :location")
    List<Clothing> findClothingsForUserAndLocation(String userId, String location);

}
