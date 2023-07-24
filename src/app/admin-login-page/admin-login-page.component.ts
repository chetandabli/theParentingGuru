// admin-login-page.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class AdminLoginPageComponent {
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient) {}

  login(): void {
    if(this.email == "" || this.password == ""){
      alert("please fill all details!");
      return
    }
    const data = { email: this.email, password: this.password };
    this.http.post<any>('https://dark-red-spider-robe.cyclic.app/admin_login', data).subscribe(
      response => {
        if (response.token) {
          // Login successful, save the token in local storage or session storage
          localStorage.setItem('adminToken', response.token);
          // Redirect to the Admin Dashboard
          window.location.href = '/admin-dashboard';
        }
      },
      error => {
        console.error(error);
        if(error.error.error == "Invalid credentials"){
          alert('Invalid credentials.');
        }else{
          alert('something went wrong please try again!')
        }
      }
    );
  }
}
