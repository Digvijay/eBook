import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';
import { ServerURI } from 'app/app.globals';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Language } from 'app/language/main/language.model';

import { LanguageService } from 'app/language/main/language.service';

@Component({
  selector: 'app-Language-form',
  templateUrl: './Language-form.component.html',
  styleUrls: ['./Language-form.component.css']
})
export class LanguageFormComponent implements OnInit {

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private http: Http,
    private snackBar: MdSnackBar,
    private route: ActivatedRoute) {  }

  id: number;
  action: string = "add";
  language: Language = new Language();

  ngOnInit() {

    if (this.route.snapshot.url[1]) {
      this.action = this.route.snapshot.url[1].path;
    }

    this.route.params.subscribe(x => {
      this.id = +x['id'];

      if (this.id) {
          this.languageService.getLanguage(this.id).then(x => {
            this.language = x;
            if (this.action == "delete") {
              this.deleteLanguage();
            } 
        });
      }
    });
  }

  deleteLanguage() {
    this.languageService.delete(this.id).then(x => {
      this.snackBar.open(`Language ${this.language.languageName} sucessfuly deleted.`, "Delete language", { duration: 2000}).afterDismissed().subscribe(() => {
        this.router.navigate(['/languages/list']);
      });
    }).catch(x => {
      this.snackBar.open(`Unable to delete: ${this.language.languageName}. It's already been used.`, "Error", { duration: 3000}).afterDismissed().subscribe(() => {
        this.router.navigate(['/languages/list']);
      });
    });
  }

  submit(data) {
    // else add or edit
    this.languageService.save(this.language);

    this.snackBar.open(`Language ${this.language.languageName} sucessfuly saved.`, "Add Language", { duration: 2000}).afterDismissed().subscribe(() => {
      this.router.navigate(['/languages/list']);
    });
  }
}
