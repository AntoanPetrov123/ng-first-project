import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { ICar } from 'src/app/core/interfaces';


@Component({
  selector: 'app-cars-new-page',
  templateUrl: './cars-new-page.component.html',
  styleUrls: ['./cars-new-page.component.css']
})
export class CarsNewPageComponent implements OnInit {

  loadedPosts: ICar[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(postData: ICar): void {
    this.http.post('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars.json',
      postData).subscribe(responseData => {
        console.log(responseData);
      });
    // console.log(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  private fetchPosts() {
    this.http.get<{ [key: string]: ICar }>('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/cars.json')
      .pipe(
        map(responseData => {
         const postArray: ICar[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
      )
      .subscribe(posts => {
        console.log(posts);
        
        this.loadedPosts = posts;
      });
  }
}
