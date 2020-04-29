package com.iiitb.dm.bookingDetails;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface BookingDetailsRepository extends CrudRepository<BookingDetails, String>{

	List<BookingDetails> findByUserId(String usr);

}
