import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private authToken: string = '';
  private loggedInUserName: string = '';
  private authTokenSubject: Subject<string> = new Subject<string>();
  private loggedInUserNameSubject: Subject<string> = new Subject<string>();

  constructor() {
    // Fetch the authToken and loggedInUserName from localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.authToken = authToken;
    }

    const loggedInUserName = localStorage.getItem('name');
    if (loggedInUserName) {
      this.loggedInUserName = loggedInUserName;
    }
  }

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token);
    this.authTokenSubject.next(token); // Notify the change to subscribers
  }

  clearAuthToken(): void {
    this.authToken = '';
    localStorage.removeItem('authToken');
    this.authTokenSubject.next(''); // Notify the change to subscribers
  }

  getLoggedInUserName(): string {
    return this.loggedInUserName;
  }

  setLoggedInUserName(userName: string): void {
    this.loggedInUserName = userName;
    localStorage.setItem('name', userName);
    this.loggedInUserNameSubject.next(userName); // Notify the change to subscribers
  }

  clearLoggedInUserName(): void {
    this.loggedInUserName = '';
    localStorage.removeItem('name');
    this.loggedInUserNameSubject.next(''); // Notify the change to subscribers
  }

  getAuthTokenSubject(): Subject<string> {
    return this.authTokenSubject;
  }

  getLoggedInUserNameSubject(): Subject<string> {
    return this.loggedInUserNameSubject;
  }
}
