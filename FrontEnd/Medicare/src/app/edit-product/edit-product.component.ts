import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  product_id:string='0'
  username:string='';
  categories:any []=[];
  product:any;
  ngOnInit(): void {

    this.auth.setLoggedIn(true);

    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || '';
  this.product_id = params['product_id'] || '';
   
    });

    

    this.http.get<any>('http://localhost:8080/viewAllCategory').subscribe(
      (res:any)=>{
        this.categories=res;

      }
      ,(error)=>{
        console.log(error)
      }
    )
    const formdata=new FormData();
    formdata.append('product_id',this.product_id)

    this.http.post<any>('http://localhost:8080/FindById',formdata).subscribe(
      (response: any) => {
        this.product = response;
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
  productEdit(prodcutFrom:NgForm){
    const formData = new FormData();
    formData.append('productName', prodcutFrom.value.productName);
    formData.append('productPrice', prodcutFrom.value.productPrice);
    formData.append('productDescription', prodcutFrom.value.productDescription);
    formData.append('productQuantity', prodcutFrom.value.productQuantity);
    formData.append('productSeller', prodcutFrom.value.productSeller);
    formData.append('productStatus', prodcutFrom.value.productStatus);
    formData.append('category_id', prodcutFrom.value.category_id);
    formData.append('product_id', this.product_id);
    formData.append('image', this.selectedImage as File);
    console.log(formData)
  
    this.http.post('http://localhost:8080/editProduct', formData)
      .subscribe(
        response => {
          // Handle success response
          console.log(response);
          this.router.navigate(['/admin'],{queryParams:{username:this.username}});
          alert("Product Edited Successfully!");
        },
        error => {
          // Handle error response
          console.error(error);
        }
      );

  }
  goBack(){
    this.router.navigate(['/manageProduct'],{queryParams:{username:this.username}});
  }
}
