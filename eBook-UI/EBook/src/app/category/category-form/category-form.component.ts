import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';
import { ServerURI } from 'app/app.globals';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Category } from 'app/category/main/category.model';

import { CategoryService } from 'app/category/main/category.service';

@Component({
  selector: 'app-Category-form',
  templateUrl: './Category-form.component.html',
  styleUrls: ['./Category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private http: Http,
    private snackBar: MdSnackBar,
    private route: ActivatedRoute) {  }

  id: number;
  action: string = "add";
  category: Category = new Category();

  ngOnInit() {

    if (this.route.snapshot.url[1]) {
      this.action = this.route.snapshot.url[1].path;
    }

    this.route.params.subscribe(x => {
      this.id = +x['id'];

      if (this.id) {
          this.categoryService.getCategory(this.id).then(x => {
            this.category = x;
            if (this.action == "delete") {
              this.deleteCategory();
            } 
        });
      }
    });
  }

  deleteCategory() {
    this.categoryService.delete(this.id).then(x => {
      this.snackBar.open(`Category ${this.category.categoryName} sucessfuly deleted.`, "Delete category", { duration: 2000}).afterDismissed().subscribe(() => {
        this.router.navigate(['/categories/list']);
      });
    }).catch(x => {
      this.snackBar.open(`Unable to delete: ${this.category.categoryName}. It's already been used.`, "Error", { duration: 2000}).afterDismissed().subscribe(() => {
        this.router.navigate(['/categories/list']);
      });
    });
  }

  submit(data) {
    // else add or edit
    this.categoryService.save(this.category);

    this.snackBar.open(`Category ${this.category.categoryName} sucessfuly saved.`, "Add category", { duration: 2000}).afterDismissed().subscribe(() => {
      this.router.navigate(['/categories/list']);
    });
  }
}
