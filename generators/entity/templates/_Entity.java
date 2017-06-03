package <%= package %>.domain;

import lombok.Getter;
import lombok.Setter;

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
}