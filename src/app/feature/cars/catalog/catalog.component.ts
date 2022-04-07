import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/core/cars.service';
import { Router } from '@angular/router';
import { ICar } from 'src/app/core/interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  // constructor(private router: Router, private carsServise: CarsService) { }

  ngOnInit(): void {
  }
  
  // isLoading: boolean = false;
  // loadedCarPosts: ICar[] = [];

  // onCreatePost(postData: ICar): void {
  //  this.carsServise.createAndStoreCarPost(postData.carName, postData.image, postData.description);
  // }
  // onFetchCarPosts() {
  //   this.router.navigate(['/catalog']);

  //   this.isLoading = true;
  //   this.carsServise.fetchCarPosts().subscribe(posts => {
  //     console.log(posts);
  //     this.isLoading = false;
  //     this.loadedCarPosts = posts;

  //   });
  // }
  
}
