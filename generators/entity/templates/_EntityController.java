package <%= package %>.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import <%= package %>.domain.<%= entityName %>Entity;
import <%= package %>.repository.<%= entityName %>Repository;

import java.util.List;

@RestController
@RequestMapping("/api/<%= mapping %>")
public class <%= entityName %>Controller {
    @Autowired
    private <%= entityName %>Repository <%= camelCaseName %>Repository;

    @RequestMapping(method = RequestMethod.GET)
    public List<<%= entityName %>Entity> findAll() {
        return <%= camelCaseName %>Repository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public <%= entityName %>Entity add(@RequestBody <%= entityName %>Entity entity) {
        return <%= camelCaseName %>Repository.save(entity);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        <%= camelCaseName %>Repository.delete(id);
    }
} 