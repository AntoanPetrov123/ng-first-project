import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICar } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()

export class CarsService {

  constructor(private http: HttpClient) { }

  getCars(): void {
    
  }
  
}
