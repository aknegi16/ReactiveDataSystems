package com.iiitb.dm.rules;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;

public class Conditions {
	private List<Condition> condition = new ArrayList<Condition>();
	private String conjunction;
	
	
	public List<Condition> getCondition() {
		return condition;
	}
	@XmlElement(name="condition")
	public void setCondition(List<Condition> condition) {
		this.condition = condition;
	}
	
	public String getConjunction() {
		return conjunction;
	}
	@XmlElement(name="conjunction")
	public void setConjunction(String conjunction) {
		this.conjunction = conjunction;
	}
	
	public Conditions() {}
	
	public Conditions(List<Condition> condition, String conjunction) {
		super();
		this.condition = condition;
		this.conjunction = conjunction;
	}
}
