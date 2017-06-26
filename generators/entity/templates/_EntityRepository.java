package <%= package %>.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import <%= package %>.domain.<%= entityName %>;

<% if (queryMethods.length > 0) { %>
import java.util.List;
<% } %>

public interface <%= entityName %>Repository extends JpaRepository<<%= entityName %>, Long> {
    <% for (index in queryMethods) {
	var camel  = queryMethods[index].camel;
	var upperCamel  = queryMethods[index].upperCamel;
	var type = queryMethods[index].type;
    %>
    List<<%= entityName %>> findBy<%= upperCamel %>(<%= type %> <%= camel %>);
    <% } %>
}