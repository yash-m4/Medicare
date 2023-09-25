package com.medicare.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.models.User;
import com.medicare.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public void addUser(User user) {
		userRepository.save(user);
	}
	
	public User FindUser(String username, String password) {
		return userRepository.findByUsernameAndPassword(username, password);
	}

}
