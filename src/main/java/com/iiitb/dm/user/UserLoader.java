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
			this.repository.save(new User("1","sravya", "sravya.m@iiitb.org","srav","20","F","123456"));
			this.repository.save(new User("2","swati", "swati.n.murthy@iiitb.org","srav","20","F","654321"));
		}
	}