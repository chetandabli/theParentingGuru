// signup.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor() {}

  signup() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    if(this.name == "" || this.email == "" || this.password == ""){
      alert("please fill all details!");
      return
    }

    fetch('https://dark-red-spider-robe.cyclic.app/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      alert(this.name + ': Signup successful');
      this.name = "";
      this.email = '';
      this.password = '';
    })
    .catch(error => {
      console.error('Signup error:', error);
    });
  }
}
