import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit{

  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  username:string='';
  categories:any []=[];
  products:any[]=[]
  productIds:any []=[]
  showReinitializeButton = false;
  counter:number=0
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


    this.http.get<any[]>('http://localhost:8080/viewAllProductsCustomer').subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
    this.showReinitializeButton = false;
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

  searchProduct(productSearchForm:NgForm){
    this.showReinitializeButton = true;
    const formdata=new FormData();
    formdata.append('key',productSearchForm.value.key)
    this.http.post<any[]>('http://localhost:8080/filterBySearchBar',formdata).subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );

  }
  goToCart(){
    this.router.navigate(['/cart'], {queryParams: { username: this.username, productIds: this.productIds }  })
  }
  addToCart(product_id: number) {
    if (!this.productIds.includes(product_id)) {
      this.productIds.push(product_id);
      this.counter++;
      console.log(this.productIds);
    }
  }
  
  selectCategory(category_id:string){
    this.showReinitializeButton = true;
    const formdata=new FormData();
    formdata.append('category_id',category_id);
    this.http.post<any[]>('http://localhost:8080/filterByCategory',formdata).subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );

  }

  buyNow(product_id:number){
    if (!this.productIds.includes(product_id)) {
      this.productIds.push(product_id);
      this.router.navigate(['/cart'], {queryParams: { username: this.username, productIds: this.productIds }  }) 
    }

    this.router.navigate(['/cart'], {queryParams: { username: this.username, productIds: this.productIds }  })
  }
  logout(){

  }
}
