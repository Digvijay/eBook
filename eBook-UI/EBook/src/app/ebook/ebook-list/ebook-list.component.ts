import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { EBook } from 'app/ebook/main/ebook.model';
import { User } from 'app/user/main/user.model';
import { Category } from 'app/category/main/category.model';

import { ServerURI } from 'app/app.globals';

import { EBookService } from 'app/ebook/main/ebook.service';
import { AuthService } from 'app/common/auth/auth.service';
import { CategoryService } from 'app/category/main/category.service';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./ebook-list.component.css']
})
export class EBookListComponent implements OnInit {

  eBooks: Array<EBook>;
  filteredCategories: Array<Category>;
  categories: Array<Category>;
  dataChange: BehaviorSubject<IEBook[]> = new BehaviorSubject<IEBook[]>([]);
  dataSource: ExampleDataSource | null;
  displayedColumns = Array<string>();
  searchFields = Array<string>();
  searchResult = Array<EBook>();
  currentUser: User;
  selectedCategory: Category;
  formCtrl = new FormControl();
  searchQuery: string;
  searchField: string;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(
    private eBookService: EBookService, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: Http,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService) {
    route.params.subscribe(val => {
      this.setInitialData();    // forces to reload component data after state change. (TODO: different impl)
    });
  }

  ngOnInit() { 
    this.currentUser = this.authService.getCurrentUser();
    this.categoryService.getCategories().then(x => { this.categories = x;
      this.formCtrl.valueChanges.subscribe(x => {
        if(x != "") {
            this.filteredCategories = this.categories.filter(cat => cat.categoryName.toLowerCase().startsWith(x));
        } else {
          this.filteredCategories = this.categories;
        }
      });
    });    

    this.searchFields = ['title', 'content', 'keywords', 'author', 'language'];
    this.authService.allowAccess(['admin', 'subscriber', 'guest']);
    this.displayedColumns = ['eBookId', 'title', 'author', 'language', 'file name', 'category', 'mime', 'download'];

    if(this.currentUser) {
      if(this.currentUser.type == 'admin') {
        this.displayedColumns.push('edit');
      }
    }
    
    this.setInitialData();
  }

  setInitialData() {
    this.getEBooks(x => {
      this.dataChange.next(this.eBooks);
    });

    this.dataSource = new ExampleDataSource(this, this.paginator);
  }

  downloadDisabled(element, currentUser) : boolean {
    if(currentUser) {
      if(currentUser.category.categoryName == element.category.categoryName || currentUser.category.categoryName == 'ALL') {
        return true;
      }    
    }
    return false;
  }

  downloadFile(eBookId: number) {
    this.eBookService.getEBook(eBookId).then(x => {
      let currentEbook = x;
      let fileName = currentEbook.fileName;

      var noExtFileName = fileName.substring(0, fileName.lastIndexOf('.'));
      window.open(ServerURI + "api/file/download/" + noExtFileName);
    });
  }

  getEBooks(callback): void {
    this.eBookService
      .getEBooks()
      .then(x => { this.eBooks = x; callback() });
  }

  filterByCategory(event) {
    if(event.isUserInput) {
      let selectedCat = event.source.value as Category;
      this.dataChange.next(this.eBooks.filter(x => x.categoryId == selectedCat.categoryId));
    }
  }

  displaySelectCategoryFun(category: Category) {
    return (category) ? category.categoryName : category;
  }

  search() {
    this.http.get(`${ ServerURI }/api/search?query=${ this.searchQuery }&searchField=${ this.searchField }`).subscribe(result => {
        this.searchResult = result.json() as Array<EBook>;
        this.dataChange.next(this.searchResult);
    });
  }

  resetSearch() {
    this.dataChange.next(this.eBooks);
    this.searchField = null;
    this.searchQuery = null;
  }

}
export interface IEBook {
  eBookId: number;
  title: string;
  author: string;
  categoryId: number;
  fileName: string;
  keywords: string;
  mime: string;
  publicationYear: number;
  userId: number;
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _eBooksComponent: EBookListComponent, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IEBook[]> {
    const displayDataChanges = [
      this._eBooksComponent.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._eBooksComponent.dataChange.value.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}