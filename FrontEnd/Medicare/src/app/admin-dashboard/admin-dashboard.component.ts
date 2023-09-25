import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private auth:AuthService){}
  username:string='';
  ngOnInit(): void {

    this.auth.setLoggedIn(true);

    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || '';
      
    });
  }
  manageCategory(){
    this.router.navigate(['/manageCategory'],{queryParams: {username:this.username}})
  }
  manageProduct(){
    this.router.navigate(['/manageProduct'],{queryParams: {username:this.username}})
  }
  viewProducts(){
    this.router.navigate(['/viewProducts'],{queryParams: {username:this.username}})
  }
  logout(){
    this.router.navigate(['/login'] );
  }
}
