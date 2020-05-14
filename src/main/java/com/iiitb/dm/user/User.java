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
	private String mobile_no;
	private String pswdLastChanged;
	
	public User() {}
	
	public User(String id, String name, String mail, String password, String age, String sex, String mobile_no, String pswdLastChanged) {
		super();
		this.id = id;
		this.name = name;
		this.mail = mail;
		this.password = password;
		this.age = age;
		this.sex = sex;
		this.mobile_no = mobile_no;
		this.pswdLastChanged = pswdLastChanged;
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

	public String getMobile_no() {
		return mobile_no;
	}



	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}



	public String getPswdLastChanged() {
		return pswdLastChanged;
	}



	public void setPswdLastChanged(String pswdLastChanged) {
		this.pswdLastChanged = pswdLastChanged;
	}

}