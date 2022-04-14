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
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  user: User;
  isEmpty: boolean = true;
  loadedCarIds: string[] = [];
  loadedCars = [];
  currentCar: ICar;

  isInEditMode: boolean = false;

  constructor(private userService: UserService, private router: Router, private carsService: CarsService) { }

  ngOnInit(): void {
    // this.isLoading = true;
    const user = this.userService.getUserData();
    if (!user || !user.profileId) {
      alert('No user logged');
      return;
    }

    // this.loadedCarPosts = data.posts;
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
