package com.iiitb.dm.rules;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Service;
@Service
public class RuleService {
	public List<Rule> ruleUnmarshall() {
		
		List<Rule> rules = new ArrayList<Rule>();
		
		try {
			// src\\main\\java\\com\\iiitb\\dm\\rules\\User.xml
		    File file1 = new File("RuleBase.xml");
		    System.out.println("file opened");
		    JAXBContext context = JAXBContext.newInstance(RuleBase.class);

		    Unmarshaller unmarshaller = context.createUnmarshaller();

		    RuleBase user = (RuleBase) unmarshaller.unmarshal(file1);

		    System.out.println(user);

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
		
		
		return rules;
	}
	
}
