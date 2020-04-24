package com.iiitb.dm.rules;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Service;
@Service
public class RuleService {
	/*
	 * Sample JSON request
	 * {
        "rule_description": "Adding extra bhogi (seats) on demand",
        "table": "Train_stats",
        "event": {
            "event_type": "insert/update",
            "conditions": {
                "conditions": [],
                "conjunction": ""
            }
        },
        "action": {
            "action_type": "DataBase",
            "query": "insert into train_table a new bogi for that particular train",
            "method_path": "none"
        },
        "rule_type": "immediate",
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

    // UnMarshalling front end
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
	
}
