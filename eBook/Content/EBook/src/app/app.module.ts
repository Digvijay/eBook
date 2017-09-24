import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatTabsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here :)

import 'hammerjs';

import { AppComponent } from './app.component';
import { UserComponent } from './user/main/user.component';
import { CategoryComponent } from './category/main/category.component';
import { LanguageComponent } from './language/main//language.component';
import { EBookComponent } from './ebook/main/ebook.component';
import { EBookListComponent } from './ebook/ebook-list/ebook-list.component';
import { EBookFormComponent } from './ebook/ebook-form/ebook-form.component';
import { FileuploadComponent } from './common/fileupload/fileupload.component';

import { EBookService } from 'app/ebook/main/ebook.service';
import { LanguageService } from 'app/language/main/language.service';
import { CategoryService } from 'app/category/main/category.service';
import { UserService } from 'app/user/main/user.service';


const ChildRoutesEBooks = [
  { path: 'list',               component: EBookListComponent },
  { path: ':id/list',           component: EBookListComponent },
  { path: 'add',                component: EBookFormComponent },
  { path: ':id/edit',           component: EBookFormComponent }, 
  { path: ':id/delete',         component: EBookFormComponent }
];

const appRoutes: Routes = [
  { path: 'languages',          component: LanguageComponent },
  { path: 'categories',         component: CategoryComponent },
  { path: 'users',              component: UserComponent },
  { path: 'ebooks',             component: EBookComponent , children: ChildRoutesEBooks},
  { path: '',
    redirectTo: '/ebooks/list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CategoryComponent,
    LanguageComponent,
    EBookComponent,
    EBookListComponent,
    EBookFormComponent,
    FileDropDirective, 
    FileSelectDirective, FileuploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only, TODO: remove after..
    ),
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ],
  providers: [
    EBookService, 
    LanguageService,
    CategoryService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
