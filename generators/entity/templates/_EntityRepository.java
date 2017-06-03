package <%= package %>.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import <%= package %>.domain.<%= entityName %>Entity;

public interface <%= entityName %>Repository extends JpaRepository<<%= entityName %>Entity, Long> {
}