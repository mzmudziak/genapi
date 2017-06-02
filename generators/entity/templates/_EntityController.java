package <%= package %>.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import <%= package %>.domain.<%= entity.name %>Entity;
import <%= package %>.repository.<%= entity.name %>Repository;

import java.util.List;

@RestController
@RequestMapping("/api/<%= entity.mapping %>")
public class <%= entity.name %>Controller {
    @Autowired
    private <%= entity.name %>Repository <%= entity.camelCaseName %>Repository;

    @RequestMapping(method = RequestMethod.GET)
    public List<<%=entity.name %>Entity> findAll() {
        return <%= entity.camelCaseName %>Repository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public <%= entity.name %>Entity add(@RequestBody <%= entity.name %>Entity entity) {
        return <%= entity.camelCaseName %>Repository.save(entity);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        <%= entity.camelCaseName %>Repository.delete(id);
    }
} 