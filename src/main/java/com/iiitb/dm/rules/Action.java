package com.iiitb.dm.rules;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;

public class Action {
	private String action_type;
	private List<Query> queries = new ArrayList<Query>();
	private String method_path;
	public String getAction_type() {
		return action_type;
	}
	public void setAction_type(String action_type) {
		this.action_type = action_type;
	}

	public List<Query> getQueries() {
		return queries;
	}
	@XmlElement(name="queries")
	public void setQueries(List<Query> queries) {
		this.queries = queries;
	}
	public String getMethod_path() {
		return method_path;
	}
	public void setMethod_path(String method_path) {
		this.method_path = method_path;
	}
	
	public Action() {}
	public Action(String action_type, List<Query> queries, String method_path) {
		super();
		this.action_type = action_type;
		this.queries = queries;
		this.method_path = method_path;
	}
	
}
