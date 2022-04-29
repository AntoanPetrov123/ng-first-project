import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsDetailPageComponent } from './cars-detail-page/cars-detail-page.component';
import { CarsNewPageComponent } from './cars-new-page/cars-new-page.component';
import { CarsListItemComponent } from './cars-list-item/cars-list-item.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';



@NgModule({
  declarations: [
    CarsListItemComponent,
    CarsDetailPageComponent,
    CarsNewPageComponent,
    CatalogComponent,
    CatalogPageComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CarsModule { }
