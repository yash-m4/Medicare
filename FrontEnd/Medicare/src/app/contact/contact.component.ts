import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  showAlert = false;
  constructor(private auth:AuthService){}
ngOnInit(): void {
  this.auth.setLoggedIn(true);
}
  submitForm() {
    this.showAlert = true;

  }

  resetForm() {
  }
}
