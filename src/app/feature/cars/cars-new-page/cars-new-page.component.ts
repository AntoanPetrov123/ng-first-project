import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/core/cars.service';
import { ICar } from 'src/app/core/interfaces';


@Component({
  selector: 'app-cars-new-page',
  templateUrl: './cars-new-page.component.html',
  styleUrls: ['./cars-new-page.component.css']
})
export class CarsNewPageComponent implements OnInit {

  loadedCarPosts: ICar[] = [];
  isLoading: boolean = false;
  
  constructor(private router: Router, private carsServise: CarsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.carsServise.fetchCarPosts().subscribe(posts => {
      console.log(posts);
      this.isLoading = false;
      this.loadedCarPosts = posts;

    });
  }

  onCreateCarPost(postData: ICar): void {
    this.carsServise.createAndStoreCarPost(postData.carName, postData.image, postData.description);
  }

  onFetchCarPosts() {

    this.isLoading = true;
    this.carsServise.fetchCarPosts().subscribe(posts => {
      console.log(posts);
      this.isLoading = false;
      this.loadedCarPosts = posts;
    });
  }

  // onDeleteCarPost(item: ICar) {
  //   this.carsServise.deleteCarPost(item);
  // }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
