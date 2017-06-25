package <%= package %>.controller;

import <%= package %>.domain.<%= entityName %>;
import <%= package %>.repository.<%= entityName %>Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/<%= mapping %>")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class <%= entityName %>Controller {
    private final <%= entityName %>Repository <%= camelCaseName %>Repository;

    @RequestMapping(method = RequestMethod.GET) 
    public List<<%= entityName %>> findAll() {
        return <%= camelCaseName %>Repository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public <%= entityName %> add(@RequestBody <%= entityName %> entity) {
        return <%= camelCaseName %>Repository.save(entity);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        <%= camelCaseName %>Repository.delete(id);
    }
} 