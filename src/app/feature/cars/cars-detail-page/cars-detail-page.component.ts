import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/core/cars.service';
import { ICar, User } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-cars-detail-page',
  templateUrl: './cars-detail-page.component.html',
  styleUrls: ['./cars-detail-page.component.css']
})
export class CarsDetailPageComponent implements OnInit {

  @ViewChild('editCarPostForm') editCarPostForm: NgForm;
  currentCar: { [key: string]: ICar; };
  carId: string;
  isInEditMode: boolean = false;
  canEdit: boolean = false;
  currntUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carsService: CarsService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }


  //11.04

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const carId: string = params.carId;
      this.carId = carId;
      this.userService.user.subscribe((userData) => {
        if (userData && userData.posts && userData.posts.includes(carId)) {
          this.canEdit = true;
        }
      })
      this.carsService.loadCarById(carId).subscribe({
        next: (params) => {
          this.currentCar = params;
          console.log(this.currentCar, 'Params of current car');
        },
        error: (error) => {
          console.log(error);
        }
      });
    })
  }

  inEditMode() {

    this.isInEditMode = true;
    this.activatedRoute.params.subscribe(params => {
      const carId: string = params.carId;

      this.carsService.loadCarById(carId).subscribe({
        next: (params) => {
          this.currentCar = params;
          console.log(this.currentCar, 'Params of current car');
        },
        error: (error) => {
          console.log(error);
        }
      });
    })
  }

  onEditCarPost(postData: ICar): void {

    //11.04


    // console.log(postData);

    // return;

    this.http.put(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars/${this.carId}.json`,
      postData).subscribe({
        next: (car) => {
          console.log(car, 'from post');
          this.updateProfile();
          // this.isInEditMode = false;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  updateProfile(): void {

    this.carsService.loadCarById(this.carId).subscribe({
      next: (params) => {
        this.currentCar = params;
        console.log(this.currentCar, 'Params of current car');
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.isInEditMode = false;
  }

}
