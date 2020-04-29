package com.iiitb.dm.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	
	public List<Admin> getAllAdmins() {
		List<Admin> admins = new ArrayList<Admin>();
		adminRepository.findAll().forEach(admins::add);
		return admins;
	}
	
	public Admin getAdmin(String id) {
		return adminRepository.findById(id).get();
	}
	
	public void addAdmin(Admin u) {
		adminRepository.save(u);
	}
	
	public void updateAdmin(Admin u, String id) {
		adminRepository.save(u);
	}
	
	public void deleteAdmin(String id) {
		adminRepository.deleteById(id);
	}
}
