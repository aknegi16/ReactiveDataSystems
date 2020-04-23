package com.iiitb.dm.rules;

import javax.xml.bind.annotation.XmlElement;

public class Rule {	
	 private String rule_description;
	 private String table;
	 private Event event;
	 private Action action;
	 private String rule_type;
	 private String rule_status;
	 
	public String getRule_description() {
		return rule_description;
	}
	@XmlElement(name="rule_description")
	public void setRule_description(String rule_description) {
		this.rule_description = rule_description;
	}
	
	public String getTable() {
		return table;
	}
	@XmlElement(name="table")
	public void setTable(String table) {
		this.table = table;
	}
	
	public Event getEvent() {
		return event;
	}
	@XmlElement(name="Event")
	public void setEvent(Event event) {
		this.event = event;
	}
	
	public Action getAction() {
		return action;
	}
	@XmlElement(name="Action")
	public void setAction(Action action) {
		this.action = action;
	}
	public String getRule_type() {
		return rule_type;
	}
	@XmlElement(name="rule_type")
	public void setRule_type(String rule_type) {
		this.rule_type = rule_type;
	}
	public String getRule_status() {
		return rule_status;
	}
	@XmlElement(name="rule_status")
	public void setRule_status(String rule_status) {
		this.rule_status = rule_status;
	}
	
	public Rule() {}
	
	public Rule(String rule_description, String table, Event event, Action action, String rule_type,
			String rule_status) {
		super();
		this.rule_description = rule_description;
		this.table = table;
		this.event = event;
		this.action = action;
		this.rule_type = rule_type;
		this.rule_status = rule_status;
	}
	 
	 
	 
}
