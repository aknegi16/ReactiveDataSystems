package com.iiitb.dm.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

	@Component
	public class UserLoader implements CommandLineRunner{
		private final UserRepository repository;
		
		@Autowired
		public UserLoader(UserRepository repository) {
			this.repository = repository;
		}
		
		public void run(String...strings) throws Exception {
			this.repository.save(new User("1","sks", "sks@gmail.com","sks","20","M","9087654321","2020-05-30 12:05:05"));
			this.repository.save(new User("2","sravya", "sravya.m@iiitb.org","sravya","20","F","9087654321","2020-04-10 12:05:05"));
			this.repository.save(new User("3","swati", "swati.murthy@iiitb.org","swati","20","F","9087654321","2020-04-10 12:05:05"));
		}
	}