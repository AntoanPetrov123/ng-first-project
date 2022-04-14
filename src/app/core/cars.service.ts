import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICar, User } from './interfaces';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()

export class CarsService {

  car: ICar;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,

  ) { }

  createAndStoreCarPost(carName: string, image: string, description: string, likes: string[]): void {

    const user = this.userService.getUserData();
    if (!user || !user.profileId) {
      alert('No user logged');
      this.router.navigate[('/login')];
      return;
    }

    const postData: ICar = { carName: carName, image: image, description: description, likes: likes, userId: user.profileId };
    this.http.post('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars.json',
      postData).subscribe({
        next: (car: any) => {

          this.http.get(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/users/${user.profileId}.json`).subscribe({
            next: (userData: any) => {

              this.http.put(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/users/${user.profileId}.json`, {
                ...userData,
                posts: userData.posts ? [...userData.posts, car.name] : [car.name]
              }).subscribe({
                next: () => {
                  this.userService.updateUserPosts();
                }
              })
            }

          })
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          console.error(error);
        }
      });
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

  loadCarById(id: string) {
    return this.http.get<ICar>(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars/${id}.json`);
  }
}
