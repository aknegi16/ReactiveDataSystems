package com.iiitb.dm.rules;
 
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class RuleBase {
	
	private List<Rule> rules = new ArrayList<Rule>();

	public List<Rule> getRules() {
		return rules;
	}

	@XmlElement(name="Rule")
	public void setRules(List<Rule> rules) {
		this.rules = rules;
	}
}
