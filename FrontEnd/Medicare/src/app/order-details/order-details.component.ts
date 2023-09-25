import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  username:string='';
  name:string='';
  phone:string='';
  address:string='';
  products:any[]=[]
  selectedProducts: { productId: number, cartQuantity: number }[] = [];
  totalSum: number = 0;
  showAlert = false;
  ngOnInit(): void {

    this.auth.setLoggedIn(true);
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || '';
      this.name = params['name'] || '';
      this.address = params['address'] || '';
      this.phone = params['phone'] || '';
      const selectedProductsString = params['selectedProducts'] || '[]';
      try {
        this.selectedProducts = JSON.parse(selectedProductsString); // Deserialize from JSON
      } catch (error) {
        console.error('Error parsing selectedProducts:', error);
      }
      

    });


    this.http.get<any[]>('http://localhost:8080/viewAllProducts').subscribe(
      (response: any[]) => {
        this.products = response;
        this.calculateTotalSum();
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  calculateTotalSum() {
    this.totalSum = 0;
    console.log('Selected Products:', this.selectedProducts);
    console.log('Products:', this.products);
    for (const selectedProduct of this.selectedProducts) {
      const product = this.products.find(p => p.product_id === selectedProduct.productId);
      if (product) {
        this.totalSum += product.productPrice * selectedProduct.cartQuantity;
      }
    }
  }
  
  

  selectedImage: File | null = null;

   getBase64Image(base64Data: string): string {
    return 'data:image/jpeg;base64,' + base64Data;
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.selectedImage = inputElement.files[0];
    }
  }
  calculateTotalAmount(): number {
    let totalAmount = 0;
    for (const selectedProduct of this.selectedProducts) {
      const product = this.products.find(p => p.product_id === selectedProduct.productId);
      if (product) {
        totalAmount += product.productPrice * selectedProduct.cartQuantity;
      }
    }
    return totalAmount;
  }
logout(){
  this.router.navigate(['/'])
}  
}
