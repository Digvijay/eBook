import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EBook } from 'app/ebook/main/ebook.model';
import { EBookService } from 'app/ebook/main/ebook.service';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./ebook-list.component.css']
})
export class EBookListComponent implements OnInit {

  private eBooks: Array<EBook>;
  private dataSource:ExampleDataSource;

  displayedColumns = ['eBookId', 'title', 'author', 'fileName', 'mime'];
  
  constructor(private eBookService: EBookService) { }

  ngOnInit() {
    this.getEBooks(x => {
      this.dataSource = new ExampleDataSource(this.eBooks);
    });
  }

  getEBooks(callback):void {
    this.eBookService
      .getEBooks()
      .then(x => { this.eBooks = x; callback()});
  }

}
export interface IEBook {
  eBookId:number;
  title:string;
  author:string;
  categoryId: number;
  fileName:string;
  keywords:string;
  mime: string;
  publicationYear:number;
  userId:number;
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor (private data:any) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IEBook[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}