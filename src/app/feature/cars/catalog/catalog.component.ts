import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentCar: ICar; 

  constructor(
    private carsService: CarsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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

  //11.04
  details(carId: string): void {

      this.carsService.loadCarById(carId).subscribe({
        next: (params) => {
          this.currentCar = {...params, id: carId} as ICar;
          this.router.navigate([`/catalog/${this.currentCar.id}`]);
        },
        error: (error) => {
          console.log(error);
        }
      });
    // })
  }






}


