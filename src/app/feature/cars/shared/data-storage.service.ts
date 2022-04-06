import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarsService } from 'src/app/core/cars.service';
import { CarsNewPageComponent } from '../cars-new-page/cars-new-page.component';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private newCar: CarsNewPageComponent) {
    
   }
}
