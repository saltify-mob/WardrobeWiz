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

    public Clothing(User user, String category, String type, String season, String color, String dateOfPurchase, String timeLastUsed, String imageUrl, String imageKey, String location) {
        this.user = user;
        this.category = category;
        this.type = type;
        this.season = season;
        this.color = color;
        this.dateOfPurchase = dateOfPurchase;
        this.timeLastUsed = timeLastUsed;
        this.imageUrl = imageUrl;
        this.imageKey = imageKey;
        this.location = location;
    }

    @Id
    @UuidGenerator
    @Column
    private String id;

    @Column
    private String category;

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

    @Column
    String imageUrl;

    @Column
    String imageKey;

    @Column(columnDefinition = "varchar(255) default closet")
    private String location;

    public String getImageUrl() {return imageUrl;}

    public String getimageKey() {return imageKey;}


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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() { return location;
    }
}
