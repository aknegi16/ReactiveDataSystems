package com.iiitb.dm.user;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public List<User> getAllUsers() {
		List<User> users = new ArrayList<User>();
		userRepository.findAll().forEach(users::add);
		return users;
	}
	
	public User getUser(String id) {
		return userRepository.findById(id).get();
	}
	
	public void addUser(User u) {
		long miliSec=Long.parseLong(u.getPswdLastChanged());
		DateFormat simple = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		  
        // Creating date from milliseconds 
        // using Date() constructor 
        Date result = new Date(miliSec);
        u.setPswdLastChanged(simple.format(result));
		userRepository.save(u);
	}
	
	public void updateUser(User u, String id) {
		long miliSec=Long.parseLong(u.getPswdLastChanged());
		DateFormat simple = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		  
        // Creating date from milliseconds 
        // using Date() constructor 
        Date result = new Date(miliSec);
        u.setPswdLastChanged(simple.format(result));
		userRepository.save(u);
	}
	
	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}
}
