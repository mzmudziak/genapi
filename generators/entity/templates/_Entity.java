package <%= package %>.domain;

import lombok.Getter;
import lombok.Setter;
<% if (hasOneToOneRelationship === true) { %>
import javax.persistence.OneToOne;
<% } %>
<% if (hasOneToManyRelationship === true) { %>
import javax.persistence.OneToMany;
<% } %>
<% if (hasManyToOneRelationship === true) { %>
import javax.persistence.ManyToOne;
<% } %>
<% if (hasManyToManyRelationship === true) { %>
import javax.persistence.ManyToMany;
<% } %>

import javax.persistence.*;

@Getter
@Setter
@Entity
public class <%= entityName %> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    <% for (idx in fields){ %>
    private <%= fields[idx].type %> <%= fields[idx].name %>;
    <% } %>
    <% for (index in relationships) {
  var relationshipType = relationships[index].type;
  var relationshipName = relationships[index].name;
  var relationshipFieldName = relationships[index].field; %>
<% if (relationshipType === 'one_to_one') { %>
    @OneToOne
<% } else if (relationshipType === 'one_to_many') { %>
    @OneToMany
<% } else if (relationshipType === 'many_to_one') { %>
    @ManyToOne
<% } else if (relationshipType === 'many_to_many') { %>
    @ManyToMany
 <% } %>
    private <%= relationshipName %> <%= relationshipFieldName %>;
<% } %>
}