import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { EBook } from 'app/ebook/main/ebook.model';
import { EBookService } from 'app/ebook/main/ebook.service';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./ebook-list.component.css']
})
export class EBookListComponent implements OnInit {

  eBooks: Array<EBook>;
  displayedColumns = ['eBookId', 'title', 'author', 'language', 'file name', 'category', 'mime', 'edit'];
  dataChange: BehaviorSubject<IEBook[]> = new BehaviorSubject<IEBook[]>([]);
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private eBookService: EBookService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.setInitialData();    // forces to reload component data after state change. (TODO: different impl)
    });
  }

  ngOnInit() {
    this.setInitialData();
  }

  setInitialData() {
    this.getEBooks(x => {
      this.dataChange.next(this.eBooks);
    });

    this.dataSource = new ExampleDataSource(this, this.paginator);
  }

  getEBooks(callback): void {
    this.eBookService
      .getEBooks()
      .then(x => { this.eBooks = x; callback() });
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