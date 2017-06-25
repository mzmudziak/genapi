package <%= package %>.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import <%= package %>.domain.<%= entityName %>;

public interface <%= entityName %>Repository extends JpaRepository<<%= entityName %>, Long> {
    <%_ for (index in queryMethods) {
	var query_camel  = queryMethods[index].camel;
	var query_upper_camel  = queryMethods[index].upperCamel;
	var field_type = queryMethods[index].type;
_%>
    List<<%= entityName %>> findBy<%= query_upper_camel %>(<%= field_type %> <%= query_camel %>);
<%_ } _%>
}