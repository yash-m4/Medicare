import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  username:string='';
  products:any[]=[]
  productIds:any []=[]
  isButtonDisabledMap: { [productId: number]: boolean } = {};
  selectedProducts: { productId: number, cartQuantity: number }[] = [];
  formIsValid = false;


  ngOnInit(): void {

    this.auth.setLoggedIn(true);
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || '';
      this.productIds=params['productIds'] || '';
    });


    this.http.get<any[]>('http://localhost:8080/viewAllProducts').subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
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
  // cartSubmit(kartForm:NgForm, productId: number){
  //   const cartQuantity = kartForm.value.cartQuantity;
  //   const selectedProduct = { productId, cartQuantity };
    
  //   this.selectedProducts.push(selectedProduct);
  //   this.isButtonDisabledMap[productId] = true;

  // }
  onCartQuantityChange(product: any) {
    // Check if the product already exists in selectedProducts
    const existingProduct = this.selectedProducts.find(p => p.productId === product.product_id);
  
    if (existingProduct) {
      // Update the cartQuantity if the product already exists
      existingProduct.cartQuantity = product.cartQuantity;
    } else {
      // If the product does not exist, add it to selectedProducts
      const selectedProduct = { productId: product.product_id, cartQuantity: product.cartQuantity };
      this.selectedProducts.push(selectedProduct);
    }
    this.checkFormValidity();
    // Update the button disable status
    this.isButtonDisabledMap[product.product_id] = true;
  }
  

  payment(){
    // this.http.post('http://localhost:8080/payment',this.selectedProducts).subscribe(
    //   (res)=>{
        this.router.navigate(['/payment'], {
          queryParams: {
            username: this.username,
            selectedProducts: JSON.stringify(this.selectedProducts) // Serialize to JSON
          }
        });
        
        
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )
  }
  checkFormValidity() {
    this.formIsValid = true;
  }
  
}
