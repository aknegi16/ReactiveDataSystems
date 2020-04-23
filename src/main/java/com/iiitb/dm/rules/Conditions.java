package com.iiitb.dm.rules;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;

public class Conditions {
	private List<Condititon> conditions = new ArrayList<Condititon>();
	private String conjunction;
	
	
	public List<Condititon> getConditions() {
		return conditions;
	}
	@XmlElement(name="condition")
	public void setConditions(List<Condititon> conditions) {
		this.conditions = conditions;
	}
	
	public String getConjunction() {
		return conjunction;
	}
	@XmlElement(name="conjunction")
	public void setConjunction(String conjunction) {
		this.conjunction = conjunction;
	}
	
	public Conditions() {}
	
	public Conditions(List<Condititon> conditions, String conjunction) {
		super();
		this.conditions = conditions;
		this.conjunction = conjunction;
	}
}
