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
	private String age;
	private String sex;
	private String pnr;
	
	
	public User() {}
	
	
	
	public User(String id, String name, String mail, String password, String age, String sex, String pnr) {
		super();
		this.id = id;
		this.name = name;
		this.mail = mail;
		this.password = password;
		this.age = age;
		this.sex = sex;
		this.pnr = pnr;
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

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPnr() {
		return pnr;
	}

	public void setPnr(String pnr) {
		this.pnr = pnr;
	}
		
}