import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsDetailPageComponent } from './cars-detail-page/cars-detail-page.component';
import { CarsNewPageComponent } from './cars-new-page/cars-new-page.component';
import { CarsListItemComponent } from './cars-list-item/cars-list-item.component';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CatalogComponent } from './catalog/catalog.component';



@NgModule({
  declarations: [
    BookingListComponent,
    CarsListItemComponent,
    CarsPageComponent,
    CarsDetailPageComponent,
    CarsNewPageComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule
  ]
})
export class CarsModule { }
