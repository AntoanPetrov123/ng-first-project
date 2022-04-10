import { CarsNewPageComponent } from './cars-new-page/cars-new-page.component';
import { CarsDetailPageComponent } from './cars-detail-page/cars-detail-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'catalog/new',
    canActivate: [AuthGuard],
    component: CarsNewPageComponent
  },
  {
    path: 'catalog/:carId',
    component: CarsDetailPageComponent
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  
  
];

export const CarsRoutingModule = RouterModule.forChild(routes);
