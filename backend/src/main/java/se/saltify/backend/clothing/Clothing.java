package se.saltify.backend.clothing;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;
import se.saltify.backend.user.User;

@Entity
@Table(name = "clothings")
public class Clothing {

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    public Clothing() {
    }

    public Clothing(User user, String id, String type, String season, String color, String dateOfPurchase, String timeLastUsed) {
        this.user = user;
        this.id = id;
        this.type = type;
        this.season = season;
        this.color = color;
        this.dateOfPurchase = dateOfPurchase;
        this.timeLastUsed = timeLastUsed;
    }

    @Id
    @UuidGenerator
    @Column
    private String id;

    @Column
    String type;

    @Column
    String season;

    @Column
    String color;

    @Column
    String dateOfPurchase;

    @Column
    String timeLastUsed;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(String dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public String getTimeLastUsed() {
        return timeLastUsed;
    }

    public void setTimeLastUsed(String timeLastUsed) {
        this.timeLastUsed = timeLastUsed;
    }

    public String getId() {
        return id;
    }
}
