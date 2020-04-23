package com.iiitb.dm.rules;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class RulesController {
	@Autowired
	private RuleService ruleService;
	
	@RequestMapping(value="/rules")
	public void ruleMarshalling() {
		System.out.println("Got here");
		ruleService.ruleUnmarshall();
	}
}
