import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient  } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  categories:any []=[];
  username:string='';
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
    
  }
  goBack(){
    this.router.navigate(['/admin'],{queryParams:{username:this.username}})
  }
  deleteCategory(category_id:any){
    const formdata=new FormData();
    formdata.append('category_id',category_id)
    this.http.post<any>('http://localhost:8080/deleteCategory',formdata).subscribe(
      (res:any)=>{
        this.categories=res;
      },
      (error)=>{
        console.log(error)
      }
    )

  }
  categoryAdd(categoryFrom:NgForm){
   
 
    const formdata=new FormData();
    formdata.append('category',categoryFrom.value.categoryName)
    this.http.post('http://localhost:8080/addCategory',formdata).subscribe(
      (response)=>{
        alert('Category is Succesfully Added')
        this.router.navigate(['/admin'],{queryParams:{username:this.username}});
      },
      (error)=>{
        console.log(error)
      }
    )

  }

}
