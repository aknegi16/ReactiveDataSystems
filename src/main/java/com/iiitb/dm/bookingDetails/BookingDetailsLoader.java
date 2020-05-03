package com.iiitb.dm.bookingDetails;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

	@Component
	public class BookingDetailsLoader implements CommandLineRunner{
		private final BookingDetailsRepository repository;
		
		@Autowired
		public BookingDetailsLoader(BookingDetailsRepository repository) {
			this.repository = repository;
		}
		
		public void run(String...strings) throws Exception {
			this.repository.save(new BookingDetails("1","1", "t1","1", "Raipur","Delhi","1","2143658709","26.04.2020","CONFIRMED"));
			this.repository.save(new BookingDetails("2","2", "t2","1", "Hyderabad","Bangalore","1","2143658708","26.04.2020","CONFIRMED"));
		}
	}