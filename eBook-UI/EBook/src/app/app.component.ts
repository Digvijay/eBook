import { Component, OnInit } from '@angular/core';

import { User } from 'app/user/main/user.model';

import { AuthService } from 'app/common/auth/auth.service';
import { DataService } from 'app/common/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private currentUser: User;

  constructor(
    private authService: AuthService,
    private dataService: DataService) 
    { 
      this.currentUser = authService.getCurrentUser();
    }

    ngOnInit() {
      this.dataService.getData().subscribe(x => {
        this.currentUser = x as User;
      });
    }

}
