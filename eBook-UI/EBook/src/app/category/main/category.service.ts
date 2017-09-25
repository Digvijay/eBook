import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Category } from 'app/category/main/category.model';
import { ServerURI } from 'app/app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { 
  }

  private categoriesUrl = 'api/categories/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  private opts:RequestOptions = new RequestOptions();
  
  
  getCategories(): Promise<Array<Category>> {
    this.opts.headers = this.headers;
    
    return this.http
      .get(ServerURI + this.categoriesUrl, this.opts)
      .toPromise()
      .then((response) => {
        return response.json() as Array<Category>[];
      })
      .catch(this.handleError);
  }
  
  getCategory(id: number): Promise<Category> {
    return this.getCategories()
      .then(Categories => Categories.find(Category => Category.categoryId === id));
  }

  save(Category: Category): Promise<Category> {
    if (Category.categoryId) {
      return this.put(Category);
    }
    return this.post(Category);
  }

  delete(categoryId:number): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${ServerURI}${this.categoriesUrl}${categoryId}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Category
  private post(Category: Category): Promise<Category> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(ServerURI + this.categoriesUrl, JSON.stringify(Category), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Category
  private put(Category: Category): Promise<Category> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${ServerURI}${this.categoriesUrl}${Category.categoryId}`;

    return this.http
      .put(url, JSON.stringify(Category), { headers: headers })
      .toPromise()
      .then(() => Category)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
