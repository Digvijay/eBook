import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from 'app/common/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userName: string;
  userPassword: string;

  constructor(
    private authService: AuthService, 
    private snackBar: MdSnackBar,
    private router:Router) { }

  ngOnInit() {
  }

  login(userName: string, userPassword: string) {
    this.authService.login(userName, userPassword,
      error => {
        this.snackBar.open("Access denied!", "Login", { duration: 2000 });
      },
      success => {
        this.snackBar.open("Access granted!", "Login", { duration: 2000 }).afterDismissed().subscribe(x => {
          this.router.navigate(['/ebooks/list']);
        });
      });
  }
}
