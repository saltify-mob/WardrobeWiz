package se.saltify.backend.clothing;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingRepository extends ListCrudRepository<Clothing, String> {

    @Query("SELECT c FROM Clothing c WHERE c.user.id = :userId")
    List<Clothing> findClothingsForUser(String userId);
}
