package <%= package %>.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import <%= package %>.domain.ExampleEntity;

public interface ExampleRepository extends JpaRepository<ExampleEntity, Long> {

}