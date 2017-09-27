import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';
import { ServerURI } from 'app/app.globals';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { User } from 'app/user/main/user.model';
import { Category } from 'app/category/main/category.model';

import { UserService } from 'app/user/main/user.service';
import { CategoryService } from 'app/category/main/category.service';
import { AuthService } from 'app/common/auth/auth.service';
import { DataService } from 'app/common/services/data.service';

@Component({
  selector: 'app-User-form',
  templateUrl: './User-form.component.html',
  styleUrls: ['./User-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private http: Http,
    private categoryService: CategoryService,
    private snackBar: MdSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService) {  }

  id: number;
  action: string = "add";
  user: User = new User();
  oldPwd: string;
  categories: Array<Category>;
  userPassword2:string;
  activeUser: User;

  ngOnInit() {
    this.authService.allowAccess(['admin', 'subscriber']);
    this.activeUser = this.authService.getCurrentUser();

    this.categoryService.getCategories().then(x => { this.categories = x; });

    if (this.route.snapshot.url[1]) {
      this.action = this.route.snapshot.url[1].path;
    }

    this.route.params.subscribe(x => {
      this.id = +x['id'];

      if (this.id) {
          this.userService.getUser(this.id).then(x => {
            this.user = x;
            this.user.userPassword = AuthService.b64DecodeUnicode(this.user.userPassword);
            this.userPassword2 = this.user.userPassword;
            this.oldPwd = this.user.userPassword;
            if (this.action == "delete") {
              this.deleteUser();
            } 
        });
      }
    });
  }

  displaySelectUserFun(category: Category) {
    return (category) ? category.categoryName : category;
  }

  deleteUser() {
    this.userService.delete(this.id).then(x => {
      this.snackBar.open(`User ${this.user.firstName} ${this.user.lastName} sucessfuly deleted.`, "Delete User", { duration: 2000}).afterDismissed().subscribe(() => {
        this.router.navigate(['/ebooks/list']);
      });
    }).catch(x => {
      this.snackBar.open(`Unable to delete: ${this.user.firstName} ${this.user.lastName}. It's already been used.`, "Error", { duration: 3000}).afterDismissed().subscribe(() => {
        this.router.navigate(['/ebooks/list']);
      });
    });
  }

  submit(data) {
    // else add or edit
    this.userService.save(this.user).then(x => {
      this.snackBar.open(`User ${this.user.firstName} ${this.user.lastName} sucessfuly saved.`, "Add User", { duration: 2000}).afterDismissed().subscribe(() => {
        this.activeUser = JSON.parse(localStorage.getItem('currentUser')) as User;
        
        if(this.activeUser.userId == this.user.userId) {  // if current user changed it's profile data
          if(this.oldPwd != this.user.userPassword) {
            this.authService.setNewPassword(this.user.userPassword);
          }
          this.dataService.updateData(this.user);
        }
        
        this.router.navigate(['/ebooks/list']);
      });
    }).catch(x => {
      this.snackBar.open(`Server error occured, unable to save changes. Try with different user name.`, "Error", { duration: 3000}).afterDismissed().subscribe(() => {
        console.log(x);
      });
    });
  }
}
