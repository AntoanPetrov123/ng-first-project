import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/core/cars.service';
import { ICar } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  animations: [
    trigger('catalogAnimation', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})
export class CatalogComponent implements OnInit {
  loadedCarPosts: ICar[] = [];
  currentCar: ICar;
  subscription: Subscription;
  isLoading: boolean = false;
  isUserLogged:boolean = false;
  canDelete: boolean = false;

  constructor(
    private carsService: CarsService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.userService.user.subscribe({
      next: (userData) => {
        console.log(userData);
        
        const profileId = userData?.profileId;
        this.isUserLogged = !!profileId;

        this.carsService.fetchCarPosts().subscribe({
          next: (posts) => {
            this.isLoading = false;
            this.loadedCarPosts = posts.map((car: ICar) => {
              return { ...car, isLiked: !!(car.likes && car.likes.find((userId) => userId === profileId)) };
            });
          }
        });
      }
    })
  }

  //11.04
  details(carId: string): void {

    this.carsService.loadCarById(carId).subscribe({
      next: (params) => {
        this.currentCar = { ...params, id: carId } as ICar;
        this.router.navigate([`/catalog/${this.currentCar.id}`]);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  like(carId: string): void {

    this.carsService.loadCarById(carId).subscribe({
      next: (carData) => {
        const userData = this.userService.getUserData();

        const currentLikes = carData.likes || [] as string[];
        const currentIndex = currentLikes.indexOf(userData.profileId);

        if (currentIndex >= 0) {
          currentLikes.splice(currentIndex, 1);
        } else {
          currentLikes.push(userData.profileId);
        }

        this.http.put(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars/${carId}.json`, {
          ...carData,
          likes: currentLikes
        }).subscribe({
          next: () => {
            const currentCar: ICar = this.loadedCarPosts.find((car) => car.id === carId);
            currentCar.likes = currentLikes;
            currentCar.isLiked = !!currentLikes.find((userId) => userId === userData.profileId);
          }
        })
      }
    })
  }

  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


