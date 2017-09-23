import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';

import 'hammerjs';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { LanguageComponent } from './language/language.component';
import { EBookComponent } from './ebook/ebook.component';

const appRoutes: Routes = [
  { path: 'languages',          component: LanguageComponent },
  { path: 'language/:id',       component: LanguageComponent },
  { path: 'categories',         component: CategoryComponent },
  { path: 'categories/:id',     component: CategoryComponent },
  { path: 'users',              component: UserComponent },
  { path: 'users/:id',          component: UserComponent },
  { path: 'ebooks',             component: EBookComponent },
  { path: 'ebooks/:id',         component: EBookComponent },
  { path: '',
    redirectTo: '/ebooks',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CategoryComponent,
    LanguageComponent,
    EBookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only, TODO: remove after..
    ),
    BrowserAnimationsModule,
    MdButtonModule, // Add material components to imports array
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
