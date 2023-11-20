package se.saltify.backend.clothing;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingRepository extends ListCrudRepository<Clothing, String> {
}
