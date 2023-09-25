import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  username:string='';
  categories:any []=[];
  products:any[]=[]
  productIds:any []=[]
  showReinitializeButton = false;
  currentImageIndex = 0;
//    '../../assets/a86df13b-197e-44e9-bac7-c6e5dfc002c8_450.jpeg',
// '../../assets/c9365793-025b-4b04-b3d3-71b8dcce961d_450.jpeg',
// '../../assets/29b0d08b-fc15-4bc0-b668-ca11eab4740c_450.jpeg'

imageUrls: string[] = [
  '../../assets/a86df13b-197e-44e9-bac7-c6e5dfc002c8_450.jpeg',
  '../../assets/c9365793-025b-4b04-b3d3-71b8dcce961d_450.jpeg',
  '../../assets/29b0d08b-fc15-4bc0-b668-ca11eab4740c_450.jpeg'
];
  ngOnInit(): void {
    this.auth.setLoggedIn(false);
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
    setInterval(() => {
      this.showNextImage();
    }, 2000);
  }
  selectedImage: File | null = null;

   getBase64Image(base64Data: string): string {
    return 'data:image/jpeg;base64,' + base64Data;
  }
  showNextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
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
}
