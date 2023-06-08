import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {
    // Check if user is logged in based on local storage
    this.loggedIn = !!localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (email === user.email && password === user.password) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('bookReport');
    localStorage.removeItem('issueDate');
    localStorage.removeItem('dueDate');
    localStorage.removeItem('recommendedBooks');
    this.router.navigate(['/login']);
    alert('Logged out successfully');
  }
}
