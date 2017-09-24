import { Component, OnInit } from '@angular/core';
import { FileuploadComponent } from 'app/common/fileupload/fileupload.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
    private route: ActivatedRoute) { }

  id: number;
  action: string = "add";
  eBook: EBook = new EBook();
  languages: Array<Language>;
  categories: Array<Category>;
  users: Array<User>;

  ngOnInit() {
    this.languageService.getLanguages().then(x => { this.languages = x; });
    this.categoryService.getCategories().then(x => { this.categories = x; });
    this.userService.getUsers().then(x => { this.users = x; });    

    if(this.route.snapshot.url[1]) {
      this.action = this.route.snapshot.url[1].path;
    }

    this.route.params.subscribe(x => {
      this.id = +x['id'];

      if (this.id) {
        if (this.action == "delete") {
          this.eBookService.delete(this.id);
          this.router.navigate(['/ebooks/list']);
        } else { // edit
          this.eBookService.getEBook(this.id).then(x => {
            this.eBook = x;
          });
        }
      }
    });
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
    this.eBook.userId = this.eBook.user.userId;
    debugger
    // else add or edit
    // TODO: implement file upload
    this.eBook.keywords = "TODO: implement upload";
    this.eBook.fileName = "TODO: implement upload";
    this.eBook.mime = "TODO: implement upload";
    this.eBookService.save(this.eBook);
    this.router.navigate(['/ebooks/list']);
  }
  
}
