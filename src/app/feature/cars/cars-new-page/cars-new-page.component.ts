import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/core/cars.service';
import { ICar } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';


@Component({
  selector: 'app-cars-new-page',
  templateUrl: './cars-new-page.component.html',
  styleUrls: ['./cars-new-page.component.css']
})
export class CarsNewPageComponent implements OnInit {

  loadedCarPosts: ICar[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private carsService: CarsService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.carsService.fetchCarPosts().subscribe({
      next: (posts) => {
        console.log(posts, 'create post');
        this.isLoading = false;
        this.loadedCarPosts = posts;
      }
    });

  }

  onCreateCarPost(postData: ICar): void {

    //11.04
    
    this.userService.user.subscribe((data) => {
      data.posts.push(postData.id);
      console.log(data.posts);
    })
      
    this.carsService
      .createAndStoreCarPost(postData.carName, postData.image, postData.description, postData.likes);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
