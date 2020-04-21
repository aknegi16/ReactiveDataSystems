package com.iiitb.dm.user;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class User {
	
	@Id
	private String id;
	private String name;
	private String mobileNumber;
	
	public User() {}
	
	public User(String id, String name, String mobileNumber) {
		super();
		this.id = id;
		this.name = name;
		this.mobileNumber = mobileNumber;
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
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
	
}
