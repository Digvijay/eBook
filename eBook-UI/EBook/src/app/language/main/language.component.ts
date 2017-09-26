import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/common/auth/auth.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.allowAccess(['admin']);
  }

}
