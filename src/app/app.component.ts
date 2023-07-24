import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: String = "The Parenting Guru"
  loggedInUserName: string = ''; 
  isLoggedIn: boolean = true;
  private authTokenSubscription: Subscription = new Subscription();
  private loggedInUserNameSubscription: Subscription = new Subscription();

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    // Fetch the logged-in user's name from localStorage
    this.loggedInUserName = this.appService.getLoggedInUserName();

    // Subscribe to the authTokenSubject to get notified of changes
    this.authTokenSubscription = this.appService.getAuthTokenSubject().subscribe((token: string) => {
      if (token) {
        this.loggedInUserName = this.appService.getLoggedInUserName();
        this.isLoggedIn = true;
      } else {
        this.loggedInUserName = '';
        this.isLoggedIn = false;
      }
    });

    // Subscribe to the loggedInUserNameSubject to get notified of changes
    this.loggedInUserNameSubscription = this.appService.getLoggedInUserNameSubject().subscribe((userName: string) => {
      this.loggedInUserName = userName;
    });
  }

  ngOnDestroy(): void {
    // Don't forget to unsubscribe to prevent memory leaks
    this.authTokenSubscription.unsubscribe();
    this.loggedInUserNameSubscription.unsubscribe();
  }

  logout() {
    // Clear the authToken and update the login status to false
    this.appService.clearAuthToken();
    this.appService.clearLoggedInUserName();
    this.isLoggedIn = false;
    this.loggedInUserName = "";
    this.router.navigate(['/auth']);
  }

  goHome(){
    this.router.navigate(['/chat']);
  }
}
