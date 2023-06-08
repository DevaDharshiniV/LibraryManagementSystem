import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.authService.logout();
  }

  searchOptions = ['Filter through options','Filter by Title', 'Filter by Author', 'Filter by Genre', 'Filter by Publishing Date'];
  selectedOption: string = '';
  isSearchFormVisible = false;

  onSearchOptionSelected(option: string) {
    this.selectedOption = option;
    this.isSearchFormVisible = option !== 'Filter through options';
  }




  onSearchSubmit(searchTerm: string) {
    console.log('hello');
    console.log('Selected option:', this.selectedOption);
    console.log('Search term:', searchTerm);
  }
}
