package com.iiitb.dm.bookingDetails;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class BookingDetailsController {
	@Autowired
	private BookingDetailsService bookingDetailsService;
	
	@RequestMapping("/bookingDetails")
	public List<BookingDetails> getAllBookingDetails() {
		return bookingDetailsService.getAllBookingDetails();
	}
	
	@RequestMapping("/bookingDetails/{id}")
	public BookingDetails getBookingDetails(@PathVariable String id) {
		return bookingDetailsService.getBookingDetails(id);
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/bookingDetails")
	public void addBookingDetails(@RequestBody BookingDetails bookingDetails) {
		bookingDetailsService.addBookingDetails(bookingDetails);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/bookingDetails/{id}")
	public void updateBookingDetails(@RequestBody BookingDetails bookingDetails, @PathVariable String id) {
		bookingDetailsService.updateBookingDetails(bookingDetails, id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/bookingDetails/{bookingDetailsId}")
	public void deleteBookingDetails(@PathVariable String bookingDetailsId) {
		bookingDetailsService.deleteBookingDetails(bookingDetailsId);
	}
}
