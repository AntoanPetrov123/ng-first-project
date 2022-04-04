import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CarsService } from 'src/app/core/cars.service';


@Component({
  selector: 'app-cars-new-page',
  templateUrl: './cars-new-page.component.html',
  styleUrls: ['./cars-new-page.component.css']
})
export class CarsNewPageComponent implements OnInit {

  constructor(private router: Router, private carsService: CarsService) { }

  ngOnInit(): void {
  }

  submitNewCar(newCarForm: NgForm): void {
    console.log(newCarForm.value); //show neme and description after new car submition
    this.carsService.addCar$(newCarForm.value).subscribe({
      next: (car) => {
        console.log(car);
        this.router.navigate(['/cars']); //navigate to cagalog of cars after creating one
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
