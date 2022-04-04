import { CarsPageComponent } from './cars-page/cars-page.component';
import { CarsNewPageComponent } from './cars-new-page/cars-new-page.component';
import { CarsDetailPageComponent } from './cars-detail-page/cars-detail-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  {
    path: 'cars',
    component: CarsPageComponent
  },
  {
    path: 'cars/new',
    component: CarsNewPageComponent
  },
  {
    path: 'cars/:carId',
    component: CarsDetailPageComponent
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  
  
];

export const CarsRoutingModule = RouterModule.forChild(routes);
