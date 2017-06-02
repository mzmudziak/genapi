package <%= package %>.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import <%= package %>.domain.<%= entity.name %>Entity;

public interface <%= entity.name %>Repository extends JpaRepository<<%= entity.name %>Entity, Long> {

}