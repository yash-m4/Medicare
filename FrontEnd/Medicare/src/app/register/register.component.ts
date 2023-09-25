import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http:HttpClient, private router:Router){}

  registersubmit(registerForm:NgForm)
  {
    console.log(registerForm.value.email)
    console.log(registerForm.value.username)
    console.log(registerForm.value.password)

    const formdata=new FormData();
    formdata.append('email',registerForm.value.email);
    formdata.append('username',registerForm.value.username);
    formdata.append('password',registerForm.value.password);

    this.http.post('http://localhost:8080/addUser', formdata).subscribe(
      (response)=>{
        this.router.navigate(['/login'], {queryParams: { message: 'Registraion Succesfull, Please Login to Continue'}  });
      },
      (error)=>{
        console.log(error)
      }
    )

  }
}
