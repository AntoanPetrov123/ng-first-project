import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICar } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()

export class CarsService {

  constructor(private http: HttpClient) { }

  addCar$(body: {carName: string, postText: string}): Observable<ICar> {
    return this.http.post<ICar>(`${apiUrl}/cars`, body, { withCredentials: true });
  }

  loadCarList(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${apiUrl}/cars`);
  }
  
                            //here should be <ICar<IPost>>
  loadCarById(id: string): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${apiUrl}/cars/${id}`);
  }
}
