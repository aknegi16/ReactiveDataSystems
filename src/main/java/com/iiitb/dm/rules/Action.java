package com.iiitb.dm.rules;

public class Action {
	private String action_type;
	private String query;
	private String method_path;
	public String getAction_type() {
		return action_type;
	}
	public void setAction_type(String action_type) {
		this.action_type = action_type;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public String getMethod_path() {
		return method_path;
	}
	public void setMethod_path(String method_path) {
		this.method_path = method_path;
	}
	
	public Action() {}
	public Action(String action_type, String query, String method_path) {
		super();
		this.action_type = action_type;
		this.query = query;
		this.method_path = method_path;
	}
	
}
