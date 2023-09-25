package com.medicare.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.medicare.models.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	@Query("SELECT p FROM Product p WHERE p.category_id = :categoryId")
    List<Product> findProductsByCategoryId(@Param("categoryId") int categoryId);

//	@Query(value="SELECT * FROM product WHERE LOWER(product_name) LIKE LOWER(:keyword) || '%'", nativeQuery = true)
//	List<Product> findByKeyword(@Param("keyword") String keyword);

	@Query(value="SELECT * from product t where LOWER(t.product_name) LIKE :name%", nativeQuery = true)
	List<Product> findByKeyword(@Param("name") String name);
	//select * from product where product_name like("ci%")
}
