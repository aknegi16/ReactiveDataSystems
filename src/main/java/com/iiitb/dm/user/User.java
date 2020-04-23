package com.iiitb.dm.user;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class User {
	
	@Id
	private String id;
	private String name;
	private String mail;
	private String password;
	
	public User() {}
	
	public User(String id, String name, String mobileNumber,String password) {
		super();
		this.id = id;
		this.name = name;
		this.mail = mobileNumber;
		this.password=password;
	}
	
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
		
}