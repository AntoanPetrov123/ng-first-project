import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/core/cars.service';
import { ICar } from 'src/app/core/interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  loadedCarPosts: ICar[] = [];
  isLoading: boolean = false;

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.carsService.fetchCarPosts().subscribe({
      next: (posts) => {
        console.log(posts);
        this.isLoading = false;
        this.loadedCarPosts = posts;
      }
    });
  }

  


}


