package oslomet.webprog.ukeoppgaver.model;

public class Car {
    private String brand;
    private String type;

    public Car(String brand, String type) {
        this.brand = brand;
        this.type = type;
    }

    public Car() {

    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
