import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatTabsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatSnackBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here :)
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

import 'hammerjs';

import { AppComponent } from './app.component';

import { UserComponent } from './user/main/user.component';
import { CategoryComponent } from './category/main/category.component';
import { LanguageComponent } from './language/main//language.component';
import { EBookComponent } from './ebook/main/ebook.component';

import { EBookFormComponent } from './ebook/ebook-form/ebook-form.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { LanguageFormComponent } from './language/language-form/language-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';

import { EBookListComponent } from './ebook/ebook-list/ebook-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { LanguageListComponent } from './language/language-list/language-list.component';
import { UserListComponent } from './user/user-list/user-list.component';

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

const ChildRoutesLanguages = [
  { path: 'list',               component: LanguageListComponent },
  { path: ':id/list',           component: LanguageListComponent },
  { path: 'add',                component: LanguageFormComponent },
  { path: ':id/edit',           component: LanguageFormComponent }, 
  { path: ':id/delete',         component: LanguageFormComponent }
];

const ChildRoutesCategories = [
  { path: 'list',               component: CategoryListComponent },
  { path: ':id/list',           component: CategoryListComponent },
  { path: 'add',                component: CategoryFormComponent },
  { path: ':id/edit',           component: CategoryFormComponent }, 
  { path: ':id/delete',         component: CategoryFormComponent }
];

const ChildRoutesUsers = [
  { path: 'list',               component: UserListComponent },
  { path: ':id/list',           component: UserListComponent },
  { path: 'add',                component: UserFormComponent },
  { path: ':id/edit',           component: UserFormComponent }, 
  { path: ':id/delete',         component: UserFormComponent }
];

const appRoutes: Routes = [
  { path: 'languages',          component: LanguageComponent, children: ChildRoutesLanguages },
  { path: 'categories',         component: CategoryComponent, children: ChildRoutesCategories },
  { path: 'users',              component: UserComponent, children: ChildRoutesUsers },
  { path: 'ebooks',             component: EBookComponent , children: ChildRoutesEBooks},
  { path: '',
    redirectTo: '/ebooks/list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FileDropDirective, 
    FileSelectDirective,
    UserComponent,
    CategoryComponent,
    LanguageComponent,
    EBookComponent,
    EBookListComponent,
    EBookFormComponent,
    CategoryListComponent,    
    CategoryFormComponent,
    LanguageListComponent,
    LanguageFormComponent,
    UserListComponent,
    UserFormComponent    
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
    MatAutocompleteModule,
    MatSnackBarModule
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
