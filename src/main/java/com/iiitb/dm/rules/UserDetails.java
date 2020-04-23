package com.iiitb.dm.rules;

import java.util.Arrays;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserDetails {

    private int id;
    private String name;
    private String email;
    private String[] roles;
    private boolean admin;

    public UserDetails() {
    }

    public UserDetails(int id, String name, String email, String[] roles, boolean admin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.admin = admin;
    }

    public int getId() {
        return id;
    }

    @XmlAttribute
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    @XmlElement
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    @XmlElement
    public void setEmail(String email) {
        this.email = email;
    }

    public String[] getRoles() {
        return roles;
    }

    @XmlElementWrapper(name = "roles")
    @XmlElement(name = "role")
    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public boolean isAdmin() {
        return admin;
    }

    @XmlElement
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + Arrays.toString(roles) +
                ", admin=" + admin +
                '}';
    }
}