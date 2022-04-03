import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { CatalogComponent } from '../cars/catalog/catalog.component';



@NgModule({
  declarations: [
    HomePageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    // SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
