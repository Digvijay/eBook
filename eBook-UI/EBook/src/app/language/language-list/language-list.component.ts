import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { Language } from 'app/language/main/language.model';
import { LanguageService } from 'app/language/main/language.service';

@Component({
  selector: 'app-Language-list',
  templateUrl: './Language-list.component.html',
  styleUrls: ['./Language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  languages: Array<Language>;
  displayedColumns = ['languageId', 'languageName', 'edit'];
  dataChange: BehaviorSubject<ILanguage[]> = new BehaviorSubject<ILanguage[]>([]);
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private LanguageService: LanguageService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.setInitialData();    // forces to reload component data after state change. (TODO: different impl)
    });
  }

  ngOnInit() {
    this.setInitialData();
  }

  setInitialData() {
    this.getlanguages(x => {
      this.dataChange.next(this.languages);
    });

    this.dataSource = new ExampleDataSource(this, this.paginator);
  }

  getlanguages(callback): void {
    this.LanguageService
      .getLanguages()
      .then(x => { this.languages = x; callback() });
  }

}
export interface ILanguage {
  languageId: number;
  languageName: string;
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _languagesComponent: LanguageListComponent, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ILanguage[]> {
    const displayDataChanges = [
      this._languagesComponent.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._languagesComponent.dataChange.value.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}