import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICar } from './interfaces';
import { map } from 'rxjs/operators';

@Injectable()

export class CarsService {

  constructor(private http: HttpClient) { }

  createAndStoreCarPost(carName: string, image: string, description: string) {
    const postData: ICar = { carName: carName, image: image, description: description};

    this.http.post('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars.json',
    postData).subscribe(responseData => {
      console.log(responseData, 'response');
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
