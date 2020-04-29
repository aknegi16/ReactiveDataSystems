package com.iiitb.dm.bookingDetails;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingDetailsService {
	@Autowired
	private BookingDetailsRepository bookingDetailsRepository;
	
	public List<BookingDetails> getAllBookingDetails() {
		List<BookingDetails> bookingDetails = new ArrayList<>();
		bookingDetailsRepository.findAll().forEach(bookingDetails::add);
		return bookingDetails;
	}
	
	public BookingDetails getBookingDetails(String id) {
		return bookingDetailsRepository.findById(id).get();
	}
	
	public void addBookingDetails(BookingDetails bookingDetails) {
		bookingDetailsRepository.save(bookingDetails);
	}
	
	public void updateBookingDetails(BookingDetails bookingDetails, String id) {
		bookingDetailsRepository.save(bookingDetails);
	}
	
	public void deleteBookingDetails(String id) {
		bookingDetailsRepository.deleteById(id);
	}

	public List<BookingDetails> getBookingByUserId(String usr) {
		// TODO Auto-generated method stub
		return bookingDetailsRepository.findByUserId(usr);
		
	}
}
