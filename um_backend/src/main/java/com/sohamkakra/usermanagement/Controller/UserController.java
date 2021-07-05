package com.sohamkakra.usermanagement.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sohamkakra.usermanagement.Repository.UserRepository;
import com.sohamkakra.usermanagement.Exception.UserNotFoundException;
import com.sohamkakra.usermanagement.Model.Status;
import com.sohamkakra.usermanagement.Model.User;


@RestController
@RequestMapping("/api/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
		
	//get all users
	@GetMapping("/users")
	public List<User> getAllUsers(){
		
		return userRepository.findAll();
		
	}
	
	@PostMapping("users/register")
	public Status registerUser(@RequestBody User newUser) {
		List<User> users = userRepository.findAll();
		System.out.println("New user: " + newUser.toString());
		for (User user : users) {
			System.out.println("Registered user: " + newUser.toString());
			if(user.equals(newUser)) {
				System.out.println("User already exists!");
				return Status.USER_ALREADY_EXISTS;
			}
		}
		userRepository.save(newUser);
		return Status.SUCCESS;
		
	}
	
	@GetMapping("users/login/{username}")
	public ResponseEntity<User> loginUser(@PathVariable String username) {
		List<User> users = userRepository.findAll();
		for (User other : users) {
			if(other.getUsername().equals(username)) {
				return ResponseEntity.ok(other);
			}
		}
		return null;		
	}
		
	//add user
	@PostMapping("/users")
	public User addUser(@RequestBody User user) {
		return userRepository.save(user);
	}
	
	// get user by id rest A
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userRepository.findById(id)
		.orElseThrow(() -> new UserNotFoundException("User not exist with id :" + id));
		return ResponseEntity.ok(user);
	}
			
	// update user rest API
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateTask(@PathVariable Long id, @RequestBody User userDetails){
		User user = userRepository.findById(id)
		.orElseThrow(() -> new UserNotFoundException("User not exist with id :" + id));
				
		user.setUsername(userDetails.getUsername());
		user.setEmailId(userDetails.getEmailId());
		user.setRole(userDetails.getRole());
		user.setPermissions(userDetails.getPermissions());
				
		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	// delete user rest API
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
		User user = userRepository.findById(id)
		.orElseThrow(() -> new UserNotFoundException("User not exist with id :" + id));
			
		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
