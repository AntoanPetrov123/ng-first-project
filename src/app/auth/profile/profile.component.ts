import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/core/cars.service';
import { ICar } from 'src/app/core/interfaces/car';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('slide', [
      state('in', style({
        opacity: 1, //fully visible
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(700)
      ]),
      transition('* => void', [
        animate(700, style({
          transform: 'translateX(100px)',
          opacity: 0,
        })
        )
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  user: User;
  currentCar: ICar;
  loadedCarIds: string[] = [];
  loadedCars = [];
  isEmpty: boolean = true;
  isInEditMode: boolean = false;
  // subscription: Subscription;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private carsService: CarsService, 
    private http: HttpClient) { }

  ngOnInit(): void {
    // this.isLoading = true;
    this.loadPosts();
    
  }

  deleteCar(id: string): void {
    const user = this.userService.getUserData();

    console.log(id, 'id');

    this.http.delete(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars/${id}.json`).subscribe({
      next: () => {
        user.posts.splice(user.posts.indexOf(id), 1);
        this.userService.updateUserPosts();
        this.loadPosts();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadPosts() {
    const user = this.userService.getUserData();
    if (!user || !user.profileId) {
      alert('No user logged');
      return;
    }

    // this.loadedCarPosts = data.posts;
    this.loadedCars = [];
    for (let carPostId of user.posts) {
      this.carsService.loadCarById(carPostId).subscribe({
        next: (params) => {
          if (params) {
            this.currentCar = params;
            this.currentCar.id = carPostId;
            this.loadedCars.push(this.currentCar);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });

      if (this.loadedCarIds) {
        this.isEmpty = false;
      }
    }
  }
}
