package com.iiitb.dm.rules;

import javax.xml.bind.annotation.XmlElement;

public class Condition {
	private String attribute;
	private String operator;
	private String value;
	
	public String getAttribute() {
		return attribute;
	}
	@XmlElement
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	public String getOperator() {
		return operator;
	}
	@XmlElement
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getValue() {
		return value;
	}
	@XmlElement
	public void setValue(String value) {
		this.value = value;
	}
	
	public Condition() {}
	
	public Condition(String attribute, String operator, String value) {
		super();
		this.attribute = attribute;
		this.operator = operator;
		this.value = value;
	}
}
