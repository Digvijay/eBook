import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Language } from 'app/language/main/language.model';
import { ServerURI } from 'app/app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LanguageService {

  constructor(private http: Http) { 
  }

  private languagesUrl = 'api/languages/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  private opts:RequestOptions = new RequestOptions();
  
  
  getLanguages(): Promise<Array<Language>> {
    this.opts.headers = this.headers;
    
    return this.http
      .get(ServerURI + this.languagesUrl, this.opts)
      .toPromise()
      .then((response) => {
        return response.json() as Array<Language>[];
      })
      .catch(this.handleError);
  }
  
  getLanguage(id: number): Promise<Language> {
    return this.getLanguages()
      .then(Languages => Languages.find(Language => Language.languageId === id));
  }

  save(Language: Language): Promise<Language> {
    if (Language.languageId) {
      return this.put(Language);
    }
    return this.post(Language);
  }

  delete(languageId: number): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${ServerURI}${this.languagesUrl}${languageId}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Language
  private post(Language: Language): Promise<Language> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(ServerURI + this.languagesUrl, JSON.stringify(Language), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Language
  private put(Language: Language): Promise<Language> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${ServerURI}${this.languagesUrl}${Language.languageId}`;

    return this.http
      .put(url, JSON.stringify(Language), { headers: headers })
      .toPromise()
      .then(() => Language)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
