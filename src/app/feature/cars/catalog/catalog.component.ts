import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/core/cars.service';
import { ICar } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  loadedCarPosts: ICar[] = [];
  isLoading: boolean = false;
  currentCar: ICar;
  likeButtonName: string = 'Like';
  totalLikes: number;

  constructor(
    private carsService: CarsService,
    private userService: UserService,
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
        this.currentCar = { ...params, id: carId } as ICar;
        this.router.navigate([`/catalog/${this.currentCar.id}`]);
      },
      error: (error) => {
        console.log(error);
      }
    });
    // })
  }

  like(carId: string): void {

    this.carsService.loadCarById(carId).subscribe({
      next: (carData) => {
        this.userService.user.subscribe({
          next: (userData) => {
            console.log(carData);
            this.currentCar = { ...carData, likes: [] } as ICar;
            // this.currentCar.likes.push(userData.id);
            // console.log(userData.id);
            let likes = this.currentCar.likes.length;
            if (this.currentCar.likes.includes(userData.id)) {
              
              this.likeButtonName = 'Unlike';
              
              for (let i = 0; i < likes; i++) {
                if (this.currentCar.likes[i] == userData.id) {
                  this.currentCar.likes.splice(i, 1);
                  this.likeButtonName = 'Like';
                }
              }
            } else {
              this.likeButtonName = 'Like';
              this.currentCar.likes.push(userData.id);
            }
            console.log(this.currentCar);

          }
        })

      }
    })
  }

  // this.userService.user.subscribe({
  //   next: (data) => {
  //     // this.isLoading = false;
  //     console.log(data.posts, 'data posts');
  //     // this.loadedCarPosts = data.posts;
  //     for (let carPostId of data.posts) {
  //       console.log(carPostId);
  //       this.carsService.loadCarById(carPostId).subscribe({
  //         next: (params) => {
  //           this.currentCar = params;
  //           this.currentCar.id = carPostId as any;
  //           this.loadedCars.push(this.currentCar);
  //           console.log(this.loadedCars, 'Params of current car');
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         }
  //       });

  //       if (this.loadedCarIds) {
  //         this.isEmpty = false;
  //       }
  //     }

  //     }

  // });





}


