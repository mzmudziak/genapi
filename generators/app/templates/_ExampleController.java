package <%= package %>.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import <%= package %>.domain.ExampleEntity;
import <%= package %>.repository.ExampleRepository;

import java.util.List;

@RestController
@RequestMapping("/api/example")
public class ExampleController {
    @Autowired
    private ExampleRepository exampleRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<ExampleEntity> findAll() {
        return exampleRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ExampleEntity add(@RequestBody ExampleEntity entity) {
        return exampleRepository.save(entity);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        exampleRepository.delete(id);
    }
} 