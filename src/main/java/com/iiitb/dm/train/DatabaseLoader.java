package com.iiitb.dm.train;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

	@Component
	public class DatabaseLoader implements CommandLineRunner{
		private final TrainRepository repository;
		
		@Autowired
		public DatabaseLoader(TrainRepository repository) {
			this.repository = repository;
		}
		
		public void run(String...strings) throws Exception {
			this.repository.save(new Train("1","t1", "5","20", "yes"));
			this.repository.save(new Train("2","t2", "4","12", "yes"));
		}
	}