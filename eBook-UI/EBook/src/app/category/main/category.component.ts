import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/common/auth/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.allowAccess(['admin']);
  }

}
