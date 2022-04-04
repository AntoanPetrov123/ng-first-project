import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsDetailPageComponent } from './cars-detail-page/cars-detail-page.component';
import { CarsNewPageComponent } from './cars-new-page/cars-new-page.component';
import { CarsListItemComponent } from './cars-list-item/cars-list-item.component';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarsListItemComponent,
    CarsPageComponent,
    CarsDetailPageComponent,
    CarsNewPageComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule
  ]
})
export class CarsModule { }
