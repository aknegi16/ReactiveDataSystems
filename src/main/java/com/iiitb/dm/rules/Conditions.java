package com.iiitb.dm.rules;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;

public class Conditions {
	private List<Condititon> condition = new ArrayList<Condititon>();
	private String conjunction;
	
	
	public List<Condititon> getCondition() {
		return condition;
	}
	@XmlElement(name="condition")
	public void setCondition(List<Condititon> condition) {
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
	
	public Conditions(List<Condititon> condition, String conjunction) {
		super();
		this.condition = condition;
		this.conjunction = conjunction;
	}
}
