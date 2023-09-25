package com.medicare.controllers;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.medicare.models.Category;
import com.medicare.models.Product;
import com.medicare.models.ProductDTO;
import com.medicare.models.SelectedProduct;
import com.medicare.models.User;
import com.medicare.services.CategoryService;
import com.medicare.services.ProductService;
import com.medicare.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class Controller {
	
	@Autowired
	UserService userService;
	@Autowired
	CategoryService categoryService;
	@Autowired
	ProductService productService;
	
	
	@PostMapping("/addUser")
	public void addUser(@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("email") String email) {
		
		System.out.println(username);
		System.out.println(password);
		System.out.println(email);
		User user=new User();
		user.setEmail(email);
		user.setPassword(password);
		user.setUsername(username);
		user.setAdmin(0);
		userService.addUser(user);
		
	}
	
	@PostMapping("/validate")
	public ResponseEntity<Map<String, Object>> validateUser(HttpServletRequest request,@RequestParam("username") String username,
			@RequestParam("password") String password){
		User user=userService.FindUser(username, password);
		if(user!=null) {
			  Map<String, Object> response = new HashMap<>();
		        response.put("isValid", true);
			if(user.isAdmin()==0) {
				response.put("isAdmin", false);
			}
			
			else{
				response.put("isAdmin", true);
			}
			 return ResponseEntity.ok(response);
		}
		else 
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	@PostMapping("/addCategory")
	public void addCategory(@RequestParam("category") String category) {
		Category c=new Category();
		c.setCategoryName(category);
		categoryService.addCategory(c);
		
	}
	
	 @GetMapping("/viewAllCategory")
	    public ResponseEntity<List<Category>> viewAllCategory() {
	        List<Category> categories = categoryService.viewAllCategory();
	        return ResponseEntity.status(HttpStatus.OK).body(categories);
	    }
	 
	 @PostMapping("/deleteCategory")
	 public ResponseEntity<List<Category>> deleteCategory(@RequestParam("category_id") int category_id){
		 categoryService.deleteCategoryById(category_id);
		 List<Category> categories = categoryService.viewAllCategory();
	        return ResponseEntity.status(HttpStatus.OK).body(categories);
	 }
	 
	 @PostMapping("/addProduct")
	 public void addProduct(@RequestParam("category_id") int category_id,
			 @RequestParam("productName") String productName,
			 @RequestParam("productPrice") int productPrice,
			 @RequestParam("productDescription") String productDescription,
			 @RequestParam("productQuantity") int productQuantity,
			 @RequestParam("productSeller") String productSeller,
			 @RequestParam("productStatus") String productStatus,
			 @RequestParam("image") MultipartFile image)  throws IOException, SQLException {
		 
		 Product product=new Product();
		 product.setCategory_id(category_id);
		 product.setProductDescription(productDescription);
		 product.setProductName(productName);
		 product.setProductPrice(productPrice);
		 product.setProductQuantity(productQuantity);
		 product.setProductSeller(productSeller);
		 product.setProductStatus(productStatus);
		 Blob blob = new SerialBlob(image.getBytes());
		 product.setImage(blob);
		 productService.addProduct(product);
		 
	 }
	 @GetMapping("/viewAllProducts")
	 public ResponseEntity<List<ProductDTO>> viewAllProducts() {
		 
		 List<Product> products = productService.viewAllProducts();
		    List<ProductDTO> productDTOs = new ArrayList<>();
		    for (Product product : products) {
		        ProductDTO productDTO = new ProductDTO();
		        productDTO.setProductName(product.getProductName());
		        productDTO.setProductPrice(product.getProductPrice());
		        productDTO.setProductDescription(product.getProductDescription());
		        productDTO.setProduct_id(product.getProduct_id());
		        productDTO.setCategory_id(product.getCategory_id());
		        productDTO.setProductQuantity(product.getProductQuantity());
		        productDTO.setProductSeller(product.getProductSeller());
		        productDTO.setProductStatus(product.getProductStatus());
		        

		        try {
		            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
		            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		            productDTO.setImageData(base64Image);
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }

		        productDTOs.add(productDTO);
		    }
		    
		    return ResponseEntity.ok(productDTOs);
	 }
	 
	 @GetMapping("/viewAllProductsCustomer")
	 public ResponseEntity<List<ProductDTO>> viewAllProductsCustomer() {
		 
		 List<Product> products = productService.viewAllProducts();
		    List<ProductDTO> productDTOs = new ArrayList<>();
		    for (Product product : products) {
		        ProductDTO productDTO = new ProductDTO();
		        if(product.getProductStatus().equals("enable")&&product.getProductQuantity()>0) {
		        	  productDTO.setProductName(product.getProductName());
		        productDTO.setProductPrice(product.getProductPrice());
		        productDTO.setProductDescription(product.getProductDescription());
		        productDTO.setProduct_id(product.getProduct_id());
		        productDTO.setCategory_id(product.getCategory_id());
		        productDTO.setProductQuantity(product.getProductQuantity());
		        productDTO.setProductSeller(product.getProductSeller());
		        productDTO.setProductStatus(product.getProductStatus());
		        

		        try {
		            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
		            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		            productDTO.setImageData(base64Image);
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }

		        productDTOs.add(productDTO);
		        }
		      
		    }
		    
		    return ResponseEntity.ok(productDTOs);
	 }
	 
	 @PostMapping("/FindById")
	 public ResponseEntity<ProductDTO> FindById(@RequestParam("product_id") int product_id){
		 Optional<Product> Oproduct=productService.findById(product_id);
			Product product=Oproduct.get();
			ProductDTO productDTO = new ProductDTO();
	        productDTO.setProductName(product.getProductName());
	        productDTO.setProductPrice(product.getProductPrice());
	        productDTO.setProductDescription(product.getProductDescription());
	        productDTO.setProduct_id(product.getProduct_id());
	        productDTO.setCategory_id(product.getCategory_id());
	        productDTO.setProductQuantity(product.getProductQuantity());
	        productDTO.setProductSeller(product.getProductSeller());
	        productDTO.setProductStatus(product.getProductStatus());
	        

	        try {
	            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
	            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
	            productDTO.setImageData(base64Image);
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
			return ResponseEntity.status(HttpStatus.OK).body(productDTO);
	 }
	 
	 @PostMapping("/editProduct")
	 public void editProduct(@RequestParam("category_id") int category_id,
			 @RequestParam("productName") String productName,
			 @RequestParam("productPrice") int productPrice,
			 @RequestParam("productDescription") String productDescription,
			 @RequestParam("productQuantity") int productQuantity,
			 @RequestParam("productSeller") String productSeller,
			 @RequestParam("productStatus") String productStatus,
			 @RequestParam("product_id") int product_id,
			 @RequestParam("image") MultipartFile image)  throws IOException, SQLException {
		 
		 Product product=new Product();
		 product.setCategory_id(category_id);
		 product.setProductDescription(productDescription);
		 product.setProductName(productName);
		 product.setProductPrice(productPrice);
		 product.setProductQuantity(productQuantity);
		 product.setProductSeller(productSeller);
		 product.setProductStatus(productStatus);
		 Blob blob = new SerialBlob(image.getBytes());
		 product.setImage(blob);
		 productService.updateProductById(product_id, product);
		
		 
	 }
	 
	 @PostMapping("/deleteProduct")
	 public ResponseEntity<List<ProductDTO>> deleteProduct(@RequestParam("product_id") int product_id) {
		 productService.deleteProduct(product_id);
		 List<Product> products = productService.viewAllProducts();
		    List<ProductDTO> productDTOs = new ArrayList<>();
		    for (Product product : products) {
		        ProductDTO productDTO = new ProductDTO();
		        productDTO.setProductName(product.getProductName());
		        productDTO.setProductPrice(product.getProductPrice());
		        productDTO.setProductDescription(product.getProductDescription());
		        productDTO.setProduct_id(product.getProduct_id());
		        productDTO.setCategory_id(product.getCategory_id());
		        productDTO.setProductQuantity(product.getProductQuantity());
		        productDTO.setProductSeller(product.getProductSeller());
		        productDTO.setProductStatus(product.getProductStatus());
		        

		        try {
		            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
		            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		            productDTO.setImageData(base64Image);
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }

		        productDTOs.add(productDTO);
		    }

		    return ResponseEntity.ok(productDTOs);
	 }
	 @PostMapping("/changeStatus")
	 public ResponseEntity<List<ProductDTO>> changeStatus(@RequestParam("product_id") int product_id) {
		 System.out.println(product_id);
		 Optional<Product> p=productService.findById(product_id);
		 Product product1=p.get();
		 String status=product1.getProductStatus();
		 if("enable".equals(status)) {
			 product1.setProductStatus("disable");
		 }
		 else {
			 product1.setProductStatus("enable");
		 }
		 System.out.println(product1);
		 productService.updateProductById(product_id, product1);
		 
		 List<Product> products = productService.viewAllProducts();
		    List<ProductDTO> productDTOs = new ArrayList<>();
		    for (Product product : products) {
		        ProductDTO productDTO = new ProductDTO();
		        productDTO.setProductName(product.getProductName());
		        productDTO.setProductPrice(product.getProductPrice());
		        productDTO.setProductDescription(product.getProductDescription());
		        productDTO.setProduct_id(product.getProduct_id());
		        productDTO.setCategory_id(product.getCategory_id());
		        productDTO.setProductQuantity(product.getProductQuantity());
		        productDTO.setProductSeller(product.getProductSeller());
		        productDTO.setProductStatus(product.getProductStatus());
		        

		        try {
		            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
		            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		            productDTO.setImageData(base64Image);
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }

		        productDTOs.add(productDTO);
		    }

		    return ResponseEntity.ok(productDTOs);
	 }
	 
	 @PostMapping("/payment")
		 public void payment(@RequestBody List<SelectedProduct> selectedProducts) {
		 for (SelectedProduct Sproduct : selectedProducts) {
	            int productId = Sproduct.getProductId();
	            int cartQuantity = Sproduct.getCartQuantity();
	            Optional<Product> p=productService.findById(productId);
	            Product product=p.get();
	            product.setProductQuantity(product.getProductQuantity()-cartQuantity);
	            productService.addProduct(product);
	            
	        }
			 
		 }
	 
	 @PostMapping("/filterByCategory")
	 public ResponseEntity<List<ProductDTO>> filterByCategory(@RequestParam("category_id") String category_id) {
		 System.out.println(category_id);
		 int categoryId = Integer.parseInt(category_id);
		 List<Product> products = productService.getProductsByCategoryId(categoryId);
		    List<ProductDTO> productDTOs = new ArrayList<>();
		    for (Product product : products) {
		        ProductDTO productDTO = new ProductDTO();
		        if(product.getProductStatus().equals("enable")&&product.getProductQuantity()>0) {
		        	  productDTO.setProductName(product.getProductName());
		        productDTO.setProductPrice(product.getProductPrice());
		        productDTO.setProductDescription(product.getProductDescription());
		        productDTO.setProduct_id(product.getProduct_id());
		        productDTO.setCategory_id(product.getCategory_id());
		        productDTO.setProductQuantity(product.getProductQuantity());
		        productDTO.setProductSeller(product.getProductSeller());
		        productDTO.setProductStatus(product.getProductStatus());
		        

		        try {
		            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
		            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		            productDTO.setImageData(base64Image);
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }

		        productDTOs.add(productDTO);
		        }
		      
		    }
		    System.out.println(productDTOs);
		    return ResponseEntity.ok(productDTOs);
	 } 
	 
	 @PostMapping("/filterBySearchBar")
	 public ResponseEntity<List<ProductDTO>> filterBySearchBar(@RequestParam("key") String key) {
		 System.out.println(key);
		List<Product> products=productService.findProductsByKeyword(key);
		System.out.println(products.size());
		 List<ProductDTO> productDTOs = new ArrayList<>();
		    for (Product product : products) {
		        ProductDTO productDTO = new ProductDTO();
		        if(product.getProductStatus().equals("enable")&&product.getProductQuantity()>0) {
		        	  productDTO.setProductName(product.getProductName());
		        productDTO.setProductPrice(product.getProductPrice());
		        productDTO.setProductDescription(product.getProductDescription());
		        productDTO.setProduct_id(product.getProduct_id());
		        productDTO.setCategory_id(product.getCategory_id());
		        productDTO.setProductQuantity(product.getProductQuantity());
		        productDTO.setProductSeller(product.getProductSeller());
		        productDTO.setProductStatus(product.getProductStatus());
		        

		        try {
		            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
		            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		            productDTO.setImageData(base64Image);
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }

		        productDTOs.add(productDTO);
		        }
		      
		    }
		    System.out.println(productDTOs);
		    return ResponseEntity.ok(productDTOs);
	 }
}
