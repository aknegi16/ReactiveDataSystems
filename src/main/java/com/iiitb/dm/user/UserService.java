package com.iiitb.dm.user;

import java.util.ArrayList;
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
		userRepository.save(u);
	}
	
	public void updateUser(User u, String id) {
		userRepository.save(u);
	}
	
	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}
}
