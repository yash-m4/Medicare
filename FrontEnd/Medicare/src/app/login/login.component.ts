import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  message:string='';
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'] || '';
      
    });

    if(this.message!=''){
  alert(this.message);
    }

  
  }

  loginsubmit(loginForm:NgForm){

    const formdata=new FormData();
    formdata.append('username', loginForm.value.username)
    formdata.append('password', loginForm.value.password)

    this.http.post('http://localhost:8080/validate', formdata).subscribe(
      (response:any)=>{
        if(response.isValid==true){
          if(response.isAdmin==false){
            this.auth.setdoubtR(true);
            this.router.navigate(['/customer'], {queryParams: { username: loginForm.value.username }  });

          }
          else{
            
            this.router.navigate(['/admin'], {queryParams: { username: loginForm.value.username }  });
          }
        }
        else{
          alert('Invalid Username or Password')
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
