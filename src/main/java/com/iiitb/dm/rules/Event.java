package com.iiitb.dm.rules;

import javax.xml.bind.annotation.XmlElement;

public class Event {
	private String event_type;
	private Conditions conditions;
	
	public String getEvent_type() {
		return event_type;
	}
	@XmlElement(name="event_type")
	public void setEvent_type(String event_type) {
		this.event_type = event_type;
	}
	public Conditions getConditions() {
		return conditions;
	}
	@XmlElement(name="conditions")
	public void setConditions(Conditions conditions) {
		this.conditions = conditions;
	}
	
	public Event() {}
	public Event(String event_type, Conditions conditions) {
		super();
		this.event_type = event_type;
		this.conditions = conditions;
	}
	
}
