import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
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
}
