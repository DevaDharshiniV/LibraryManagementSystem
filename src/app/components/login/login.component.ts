import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookRequestService } from 'src/app/services/book-request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private router: Router, private authService: AuthService, private bookRequestService: BookRequestService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    })

  }


  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }

    if (this.authService.login(email, password)) {
      this.router.navigateByUrl('/home');
      alert('Logged in successfully');
      this.bookRequestService.clearBookReport();
    } else {
      alert('Invalid email or password');
    }
  }

}
