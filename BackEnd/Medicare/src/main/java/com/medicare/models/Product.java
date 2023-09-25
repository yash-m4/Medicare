package com.medicare.models;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "product", schema = "medicare")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="product_id",updatable = false,nullable = false)
	private int product_id;
	@Column
	private int category_id;
	@Column
	private String productName;
	@Column
	private int productPrice;
	@Column
	private String productDescription;
	@Column
	private int productQuantity;
	@Column
	private String productSeller;
	@Column
	private String productStatus;
	@Lob
	private Blob image;
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public int getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public int getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}
	public String getProductSeller() {
		return productSeller;
	}
	public void setProductSeller(String productSeller) {
		this.productSeller = productSeller;
	}
	public String getProductStatus() {
		return productStatus;
	}
	public void setProductStatus(String productStatus) {
		this.productStatus = productStatus;
	}
	public Blob getImage() {
		return image;
	}
	public void setImage(Blob image) {
		this.image = image;
	}
	@Override
	public String toString() {
		return "Product [product_id=" + product_id + ", category_id=" + category_id + ", productName=" + productName
				+ ", productPrice=" + productPrice + ", productDescription=" + productDescription + ", productQuantity="
				+ productQuantity + ", productSeller=" + productSeller + ", productStatus=" + productStatus + ", image="
				+ image + "]";
	}
	public Product(int product_id, int category_id, String productName, int productPrice, String productDescription,
			int productQuantity, String productSeller, String productStatus, Blob image) {
		super();
		this.product_id = product_id;
		this.category_id = category_id;
		this.productName = productName;
		this.productPrice = productPrice;
		this.productDescription = productDescription;
		this.productQuantity = productQuantity;
		this.productSeller = productSeller;
		this.productStatus = productStatus;
		this.image = image;
	}
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
