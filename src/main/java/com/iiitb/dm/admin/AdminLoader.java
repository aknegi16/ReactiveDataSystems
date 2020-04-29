package com.iiitb.dm.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

	@Component
	public class AdminLoader implements CommandLineRunner{
		private final AdminRepository repository;
		
		@Autowired
		public AdminLoader(AdminRepository repository) {
			this.repository = repository;
		}
		
		public void run(String...strings) throws Exception {
			this.repository.save(new Admin("1","sravya", "sravya.m@iiitb.org","sravya","20","F"));
			this.repository.save(new Admin("2","swati", "swati.n.murthy@iiitb.org","swati","20","F"));
			this.repository.save(new Admin("3","somesh", "someshkumar.singh@iiitb.org","somesh","20","M"));
			this.repository.save(new Admin("4","akash", "akash.negi@iiitb.org","akash","20","M"));
		}
	}