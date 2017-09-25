import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { Category } from 'app/Category/main/category.model';
import { CategoryService } from 'app/category/main/category.service';

@Component({
  selector: 'app-Category-list',
  templateUrl: './Category-list.component.html',
  styleUrls: ['./Category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category>;
  displayedColumns = ['categoryId', 'categoryName', 'edit'];
  dataChange: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.setInitialData();    // forces to reload component data after state change. (TODO: different impl)
    });
  }

  ngOnInit() {
    this.setInitialData();
  }

  setInitialData() {
    this.getCategories(x => {
      this.dataChange.next(this.categories);
    });

    this.dataSource = new ExampleDataSource(this, this.paginator);
  }

  getCategories(callback): void {
    this.categoryService
      .getCategories()
      .then(x => { this.categories = x; callback() });
  }

}
export interface ICategory {
  categoryId: number;
  categoryName: string;
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _categoriesComponent: CategoryListComponent, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ICategory[]> {
    const displayDataChanges = [
      this._categoriesComponent.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._categoriesComponent.dataChange.value.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}