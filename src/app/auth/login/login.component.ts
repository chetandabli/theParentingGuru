import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loggedInUserName: string = ''; 
  isLoggedIn: boolean = false;

  constructor(private router: Router, private appService: AppService) {}

  login() {
    const user = {
      email: this.email,
      password: this.password
    };

    if(this.email == "" || this.password == ""){
      alert("please fill all details!");
      return
    }
    fetch('https://dark-red-spider-robe.cyclic.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      alert(data.name + ': Login successful');
      this.email = '';
      this.password = '';
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('name', data.name);
      this.appService.setAuthToken(data.token)
      this.appService.setLoggedInUserName(data.name)
      this.router.navigate(['/chat']);
    })
    .catch(error => {
      console.error('Login error:', error);
    });
  }
}
