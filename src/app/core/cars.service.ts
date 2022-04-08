import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICar } from './interfaces';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class CarsService {

  constructor(private http: HttpClient, private router: Router) { }

  createAndStoreCarPost(carName: string, image: string, description: string): void {
    const postData: ICar = { carName: carName, image: image, description: description};

    this.http.post('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars.json',
    postData).subscribe({
      next: (car) => {
        console.log(car);
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  // console.log(postData);
  }

  fetchCarPosts() {
    return this.http.get<{ [key: string]: ICar }>('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars.json')
    .pipe(
      map(responseData => {
        const postArray: ICar[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
    );
}

  // deleteCarPost(item: ICar) {
  
  //   return this.http.delete(item.id);
  // }
  
}
