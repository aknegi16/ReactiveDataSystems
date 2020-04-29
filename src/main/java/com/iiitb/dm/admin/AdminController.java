package com.iiitb.dm.admin;

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
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("/admins")
	public List<Admin> getAllAdmins() {
		return adminService.getAllAdmins();
	}
	
	@RequestMapping("/admins/{id}")
	public Admin getAdmin(@PathVariable String id) {
		System.out.println("Got here");
		return adminService.getAdmin(id);
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/admins")
	public void addAdmin(@RequestBody Admin admin) {
		adminService.addAdmin(admin);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/admins/{id}")
	public void updateAdmin(@RequestBody Admin admin, @PathVariable String id) {
		adminService.updateAdmin(admin, id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/admins/{id}")
	public void deleteAdmin(@PathVariable String id) {
		adminService.deleteAdmin(id);
	}
}
