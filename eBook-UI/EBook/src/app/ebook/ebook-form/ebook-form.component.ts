import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';
import { ServerURI } from 'app/app.globals';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { EBook } from 'app/ebook/main/ebook.model';
import { Language } from 'app/language/main/language.model';
import { Category } from 'app/category/main/category.model';
import { User } from 'app/user/main/user.model';

import { EBookService } from 'app/ebook/main/ebook.service';
import { LanguageService } from 'app/language/main/language.service';
import { CategoryService } from 'app/category/main/category.service';
import { UserService } from 'app/user/main/user.service';
import { AuthService } from 'app/common/auth/auth.service';

@Component({
  selector: 'app-ebook-form',
  templateUrl: './ebook-form.component.html',
  styleUrls: ['./ebook-form.component.css']
})
export class EBookFormComponent implements OnInit {

  constructor(
    private eBookService: EBookService,
    private languageService: LanguageService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private http: Http,
    private snackBar: MdSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute) { 

    }

  id: number;
  action: string = "add";
  eBook: EBook = new EBook();
  languages: Array<Language>;
  categories: Array<Category>;
  users: Array<User>;

  ngOnInit() {
    this.authService.allowAccess(['admin']);

    this.languageService.getLanguages().then(x => { this.languages = x; });
    this.categoryService.getCategories().then(x => { this.categories = x; });
    this.userService.getUsers().then(x => { this.users = x; });

    if (this.route.snapshot.url[1]) {
      this.action = this.route.snapshot.url[1].path;
    }

    this.route.params.subscribe(x => {
      this.id = +x['id'];

      if (this.id) {
          this.eBookService.getEBook(this.id).then(x => {
          this.eBook = x;
          if (this.action == "delete") {
            this.deleteEBook();
          } 
        });
      }
    });
  }

  deleteEBook() {
    this.eBookService.delete(this.id);
    this.snackBar.open(`Book ${this.eBook.title} sucessfuly deleted.`, "Delete book", { duration: 2000}).afterDismissed().subscribe(() => {
      this.router.navigate(['/ebooks/list']);
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.eBook.fileName = file.name;
      this.eBook.mime = file.type;

      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      let headers = new Headers()
      let options = new RequestOptions({ headers: headers });
      let apiUrl1 = ServerURI + "api/fileupload";

      this.http.post(apiUrl1, formData, options)
        .catch(error => Observable.throw(error))
        .subscribe(
          data => { this.snackBar.open(`File ${this.eBook.fileName} sucessfuly uploaded.`, "File upload", { duration: 2000}); },
          error => { console.log(error); }
        )
    }
  }

  displaySelectCategoryFun(category: Category) {
    return (category) ? category.categoryName : category;
  }

  displaySelectLanguageFun(language: Language) {
    return (language) ? language.languageName : language;
  }

  displaySelectUserFun(user: User) {
    return (user) ? user.firstName + " " + user.lastName : user;
  }

  submit(data) {
    this.eBook.categoryId = this.eBook.category.categoryId;
    this.eBook.languageId = this.eBook.language.languageId;
    this.eBook.userId = this.authService.getCurrentUser().userId;
    
    // else add or edit
    this.eBook.keywords = "TODO: get from lucene.net";
    this.eBookService.save(this.eBook).then(x => {
      this.snackBar.open(`Book ${this.eBook.title} sucessfuly saved.`, "Add book", { duration: 2000}).afterDismissed().subscribe(() => {
        console.log(x);
        this.router.navigate(['/ebooks/list']);
      });
    }).catch(x => {
      this.snackBar.open(`Unable to save book.`, "Error", { duration: 3000}).afterDismissed().subscribe(() => {
        console.log(x);
      });
    });
  }
}
