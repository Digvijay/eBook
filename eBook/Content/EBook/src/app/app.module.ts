import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatTabsModule, MatInputModule, MatTableModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import 'hammerjs';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { LanguageComponent } from './language/language.component';
import { EBookComponent } from './ebook/main/ebook.component';

import { EBookService } from 'app/ebook/main/ebook.service';
import { EBookListComponent } from './ebook/ebook-list/ebook-list.component';
import { EbookFormComponent } from './ebook/ebook-form/ebook-form.component';

const ChildRoutesEBooks = [
  { path: 'list',               component: EBookListComponent },
  { path: 'list/:id',           component: EBookListComponent },
  { path: 'add',                component: EbookFormComponent },
  { path: 'update/:id',         component: EbookFormComponent }, 
  { path: 'delete/:id',         component: EBookComponent }
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
    EbookFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only, TODO: remove after..
    ),
    BrowserAnimationsModule,
    MdButtonModule, // Add material components to imports array
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [EBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
