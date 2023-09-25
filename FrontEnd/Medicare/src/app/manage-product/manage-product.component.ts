import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  username:string='';
  categories:any []=[];
  products:any[]=[]
  ngOnInit(): void {

    this.auth.setLoggedIn(true);

    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || '';
      
    });
    this.http.get<any>('http://localhost:8080/viewAllCategory').subscribe(
      (res:any)=>{
        this.categories=res;

      }
      ,(error)=>{
        console.log(error)
      }
    )


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
  productAdd(prodcutFrom:NgForm){
    const formData = new FormData();
    formData.append('productName', prodcutFrom.value.productName);
    formData.append('productPrice', prodcutFrom.value.productPrice);
    formData.append('productDescription', prodcutFrom.value.productDescription);
    formData.append('productQuantity', prodcutFrom.value.productQuantity);
    formData.append('productSeller', prodcutFrom.value.productSeller);
    formData.append('productStatus', prodcutFrom.value.productStatus);
    formData.append('category_id', prodcutFrom.value.category_id);
    formData.append('image', this.selectedImage as File);
    console.log(formData)
  
    this.http.post('http://localhost:8080/addProduct', formData)
      .subscribe(
        response => {
          // Handle success response
          console.log(response);
          this.router.navigate(['/admin'],{queryParams:{username:this.username}});
          alert("Item Added Successfully!");
        },
        error => {
          // Handle error response
          console.error(error);
        }
      );

  }
  editProduct(product_id: number) {



    this.router.navigate(['/edit'], {
      queryParams: {
        username: this.username,
        product_id: product_id
      }
    });
  }
  deleteProduct(product_id:number){
    const formdata=new FormData();
    formdata.append('product_id',product_id.toString())

    this.http.post<any[]>('http://localhost:8080/deleteProduct',formdata).subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
  changeStatus(product_id:number){
    const formdata=new FormData();
    formdata.append('product_id',product_id.toString())
    this.http.post<any[]>('http://localhost:8080/changeStatus',formdata).subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
  goBack(){
    this.router.navigate(['/admin'],{queryParams:{username:this.username}});
  }
}
