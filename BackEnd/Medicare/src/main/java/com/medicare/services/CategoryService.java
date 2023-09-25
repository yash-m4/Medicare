package com.medicare.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.models.Category;
import com.medicare.repositories.CategoryRepository;
@Service
public class CategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public void addCategory(Category category){
		categoryRepository.save(category);
	}
	
	public List<Category> viewAllCategory(){
		return categoryRepository.findAll();
	}
	
	public Optional<Category> findByCategoryID(int category_id) {
		return categoryRepository.findById(category_id);
	}
	public void deleteCategoryById(int category_id) {
		categoryRepository.deleteById(category_id);
	}

}
