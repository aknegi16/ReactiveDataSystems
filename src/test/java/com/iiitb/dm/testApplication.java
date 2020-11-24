package com.iiitb.dm;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.iiitb.dm.rules.RuleService;



@RunWith(SpringRunner.class)
@SpringBootTest
class testApplication {

	
  //instantiate repository 
	//and service
	@Autowired
	private RuleService service;
	
	
	
	
	
	
	@Test
	public void test1() {
		assertEquals(null,service.getRuleById(10000));
		
		
		
		
	}

}
