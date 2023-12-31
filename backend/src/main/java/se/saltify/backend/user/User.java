package se.saltify.backend.user;

import jakarta.persistence.*;
import se.saltify.backend.clothing.Clothing;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "users")
public class User {

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = ALL)
    private List<Clothing> clothings = new ArrayList<>();

    public User() {
    }

    public User(String id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Id
    @Column
    private String id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    public String getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
