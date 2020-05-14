package com.iiitb.dm.rules;

import javax.xml.bind.annotation.XmlElement;

public class Query {
	private String query;

	public String getQuery() {
		return query;
	}
	@XmlElement(name="query")
	public void setQuery(String query) {
		this.query = query;
	}
	
	public Query() {}
	public Query(String query) {
		super();
		this.query = query;
	}
	
}
