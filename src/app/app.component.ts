import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedInUserName: string = ''; // Add a variable to store the name of the logged-in user
  isLoggedIn: boolean = false; // Add a variable to track the user's login status

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch the logged-in user's name from localStorage
    const loggedInUserName = localStorage.getItem("name");
    if (loggedInUserName) {
      this.loggedInUserName = loggedInUserName;
    }

    // Check if the authToken is present in localStorage and update isLoggedIn accordingly
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    // Clear the authToken and update the login status to false
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
