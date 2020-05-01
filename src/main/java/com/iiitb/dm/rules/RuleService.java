package com.iiitb.dm.rules;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Service;

@Service
public class RuleService {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	/*
	 * Sample JSON request
	 * {
        "rule_description": "Adding extra compartments (seats) on demand",
        "table": "train",
        "event": {
            "event_type": "select",
            "conditions": {
                "condition": [
                    {
                        "attribute": "remaining_seats",
                        "operator": "<=",
                        "value": "5"
                    }
                ],
                "conjunction": "none"
            }
        },
        "action": {
            "action_type": "update",
            "query": "update train set remaining_seats=remaining_seats+10 where train_id=?",
            "method_path": "none"
        },
        "rule_type": "deferred",
        "rule_status": "Active"
    }
	 * */
	
	public boolean ruleBaseMarshall(Rule rule) {
		
        List<Rule> rules = ruleBaseUnmarshall();
        try {
            rules.add(rule);
            RuleBase rulebase = new RuleBase();
            rulebase.setRules(rules);
            JAXBContext context = JAXBContext.newInstance(RuleBase.class);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            marshaller.marshal(rulebase, new File("RuleBase.xml"));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return false;
        }
    }

    public List<Rule> ruleBaseUnmarshall() {
        try {
            File file = new File("RuleBase.xml");

            if (file.createNewFile()) {
                List<Rule> temp = new ArrayList<Rule>();
                return temp;
            } else {
                JAXBContext context = JAXBContext.newInstance(RuleBase.class);
                Unmarshaller umarshaller = context.createUnmarshaller();
                RuleBase rulebase = (RuleBase) umarshaller.unmarshal(file);

                List<Rule> rules = new ArrayList<Rule>();

                for (Rule rule : rulebase.getRules()) {
                    rules.add(rule);
                }
                return rules;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public Rule getRuleById(int ruleId) {
    	List<Rule> rules = ruleBaseUnmarshall();
    	for (Rule rule : rules) {
    		if (rule.getRuleId() == ruleId) {
    			return rule;
    		}
    	}
    	return null;
    }
    
    //Deletes rule specified by ruleId, removes the file and puts back
    // all the remaining rules back into the file
    public void deleteRule(int ruleId) {
    	List<Rule> rules = ruleBaseUnmarshall();
    	Rule ruleToBeDeleted=null;
    	for (Rule rule : rules) {
    		if (rule.getRuleId() == ruleId) {
    			ruleToBeDeleted = rule;
    			break;
    		}
    	}
    	rules.remove(ruleToBeDeleted);
    	File file = new File("RuleBase.xml");
    	file.delete();
    	
    	for (Rule rule : rules) {
    		ruleBaseMarshall(rule);
    	}
    }
    
    public void updateRule(Rule rule, int ruleId) {
    	deleteRule(ruleId);
    	ruleBaseMarshall(rule);
    }
    // function for forming the event, action queries for each rule
    public void rulePreprocessing() {
    	
    	// this list gives json object addresses on printing
    	List<Rule> rules=ruleBaseUnmarshall();
    	
    	// so converting the contents of each rule to an event and action query and passing to execute function
    	for(Rule rule:rules)
    	{
    		if(rule.getRule_status().equals("Active"))
    		{
    			String event="";
    			String action="";
    			String actiontype="";
    			
    			event="Select *from "+rule.getTable()+" where ";
    			
    			// for each condition, getting the attribute, operator, value and appending with next conditions
    			int count=(rule.getEvent().getConditions().getCondition()).size();
    			for(Condition con:rule.getEvent().getConditions().getCondition())
    			{
    				event=event+con.getAttribute()+con.getOperator()+con.getValue();
    				if(count>1)
    				{
    					event=event+rule.getEvent().getConditions().getConjunction();
    				}
    				count--;
    			}
    			
    			// action query
    			action=rule.getAction().getQuery();
    			actiontype=rule.getAction().getAction_type();
    			
    			System.out.println(event);
    			System.out.println(action);
    			
    			ruleExecute(event,action,actiontype);
    		}
    	}
    }
    
    // function for executing the action
    public void ruleExecute(String event,String action,String actiontype){
    	
    	String actionSelectString="";
    	
    	if(actiontype.equals("insert"))
    		actionSelectString="Select * from "+(action.split(" "))[2]+"";
    	else if(actiontype.equals("update"))
    		actionSelectString="Select * from "+(action.split(" "))[1]+"";
		
		try {
				// finding the column names of action query table
				ResultSetMetaData actionMetaData=jdbcTemplate.query(actionSelectString, new ResultSetExtractor<ResultSetMetaData>(){
					@Override
                     public ResultSetMetaData extractData(ResultSet rs) throws SQLException, DataAccessException {
						ResultSetMetaData rsmd = rs.getMetaData();
                            return rsmd;
                        }
					});

				// finding ResultSet of event query and for each row applying action *********
                jdbcTemplate.query(event,new ResultSetExtractor<ResultSet>() {

                	@Override
                	public ResultSet extractData(ResultSet eventResultSet) throws SQLException, DataAccessException {
                		
                		// for insert action
                		if(actiontype.equals("insert"))
                		{	// for each row of result set
	                		while(eventResultSet.next())
	                		{
	                			try {
	                            	jdbcTemplate.update(new PreparedStatementCreator() {
	                            		 
	                                    public PreparedStatement createPreparedStatement(Connection con)
	                                            throws SQLException {
	                                        PreparedStatement stmt = con.prepareStatement(action);
	                                        //System.out.println(stmt);
	                                        // setting the ? as ordinal parameters
	                                        for(int j=1;j<=actionMetaData.getColumnCount();j++)
	                                                stmt.setString(j, eventResultSet.getString(actionMetaData.getColumnLabel(j)));
	                                        return stmt;
	                                    }
	                                });
	                            	}
	                            	catch(Exception e) {
	                                    e.printStackTrace();
	                                }
	                		}
                		}
                		else if(actiontype.equals("update"))
                		{
                			System.out.println("update");
                			while(eventResultSet.next())
	                		{
	                			try {
	                            	jdbcTemplate.update(new PreparedStatementCreator() {
	                            		 
	                                    public PreparedStatement createPreparedStatement(Connection con)
	                                            throws SQLException {
	                                        PreparedStatement stmt = con.prepareStatement(action);
	                                        //System.out.println(stmt);
	                                        stmt.setInt(1, eventResultSet.getInt(actionMetaData.getColumnLabel(1)));
	                                        return stmt;
	                                    }
	                                });
	                            	}
	                            	catch(Exception e) {
	                                    e.printStackTrace();
	                                }
	                		}
                		}
						return eventResultSet;
	                        }});
                // 	CLOSE***************** finding ResultSet of event query and for each row applying action *********
	                    
				}
				catch(Exception e) {
					e.printStackTrace();
        		}
	}

}