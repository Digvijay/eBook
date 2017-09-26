import { Component, OnInit } from '@angular/core';

import { EBook } from 'app/ebook/main/ebook.model'
import { User } from 'app/user/main/user.model'

import { EBookService } from 'app/ebook/main/ebook.service';
import { AuthService } from 'app/common/auth/auth.service';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
  
})
export class EBookComponent implements OnInit {

  constructor(private authService: AuthService) { }

  currentUser:User;
  eBooks:Array<EBook>;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
