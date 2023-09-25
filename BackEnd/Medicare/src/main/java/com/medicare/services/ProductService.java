package com.medicare.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.models.Product;
import com.medicare.repositories.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	
	public void addProduct(Product product) {
		productRepository.save(product);
	}
	public List<Product> viewAllProducts(){
		return productRepository.findAll();
	}
	
	public void deleteProduct(int product_id) {
		productRepository.deleteById(product_id);
	}
	public Optional<Product> findById(int product_id) {
		return productRepository.findById(product_id);
	}
	
	public List<Product> getProductsByCategoryId(int categoryId) {
        return productRepository.findProductsByCategoryId(categoryId);
    }

	public Product updateProductById(int productId, Product newProduct) {
        Optional<Product> existingProductOptional = productRepository.findById(productId);

        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            
            
            existingProduct.setCategory_id(newProduct.getCategory_id());
            existingProduct.setProductName(newProduct.getProductName());
            existingProduct.setProductPrice(newProduct.getProductPrice());
            existingProduct.setProductDescription(newProduct.getProductDescription());
            existingProduct.setProductQuantity(newProduct.getProductQuantity());
            existingProduct.setProductSeller(newProduct.getProductSeller());
            existingProduct.setProductStatus(newProduct.getProductStatus());
            existingProduct.setImage(newProduct.getImage());

         
            return productRepository.save(existingProduct);
        } else {
           
            throw new RuntimeException("Product not found with ID: " + productId);
        }
    }
	


    public List<Product> findProductsByKeyword(String key) {
      
        return productRepository.findByKeyword(key);
    }
    
    
}
