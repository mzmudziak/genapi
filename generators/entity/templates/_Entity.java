package <%= package %>.domain;

import lombok.Getter;
import lombok.Setter;
<%_ if (hasOneToOneRelationship === true) { _%>
import javax.persistence.OneToOne;
<%_ } _%>
<%_ if (hasOneToManyRelationship === true) { _%>
import javax.persistence.OneToMany;
<%_ } _%>
<%_ if (hasManyToOneRelationship === true) { _%>
import javax.persistence.ManyToOne;
<%_ } _%>
<%_ if (hasManyToManyRelationship === true) { _%>
import javax.persistence.ManyToMany;
<%_ } _%>

import javax.persistence.*;

@Getter
@Setter
@Entity
public class <%= entityName %>Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    <% for (idx in fields){ %>
    private <%= fields[idx].type %> <%= fields[idx].name %>;
    <% } %>
    <%_ for (index in relationships) {
  var relationshipType = relationships[index].type;
  var relationshipName = relationships[index].name;
  var relationshipFieldName = relationships[index].field; _%>
<%_ if (relationshipType === 'one_to_one') { _%>
    @OneToOne
<%_ } else if (relationshipType === 'one_to_many') { _%>
    @OneToMany
<%_ } else if (relationshipType === 'many_to_one') { _%>
    @ManyToOne
<%_ } else if (relationshipType === 'many_to_many') { _%>
    @ManyToMany
 <%_ } _%>
    private <%= relationshipName %> <%= relationshipFieldName %>;
<%_ } _%>
}