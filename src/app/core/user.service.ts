import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { ICar, User } from './interfaces';
import { Router } from '@angular/router';


interface RegisterResponseData { //response data from firebase

  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; //for login request
}


@Injectable({ providedIn: 'root' })
export class UserService {
  user = new BehaviorSubject<User>(null); //get access to the current active user; null starting value
  token: string = null;

  isLoggedIn = this.user.pipe(map(user => !!user));

  constructor(
    private http: HttpClient,
    private router: Router) { }

  logout() {
    this.user.next(null);
  }
  register(username: string, email: string, password: string) {
    return this.http
      .post<RegisterResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTU2lv0sZ-kvLAhaKSX_afxkJLnCD505o',
        {
          username: username,
          email: email,
          password: password,
          returnSecureToken: true //always should be true
        })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.http.post('https://instacar-project-ee1a1-default-rtdb.firebaseio.com/users.json',
            {
              userId: resData.localId,
              username: username,
              posts: [],
              email: email,
            }).subscribe({
              next: (user: any) => {
                this.http.get(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/users/${user.name}.json`).subscribe({
                  next: (data: any) => {

                    this.handleAuthentication(
                      resData.email,
                      resData.localId,
                      data.id,
                      [],
                      resData.idToken,
                      +resData.expiresIn //convert in number
                    );
                  }
                });
              },
              error: (error) => {
                console.log(error);
              }
            });

        })
      )
      ;
  }

  login(email: string, password: string) {
    return this.http
      .post<RegisterResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTU2lv0sZ-kvLAhaKSX_afxkJLnCD505o',
        {
          email: email,
          password: password,
          returnSecureToken: true //always should be true
        }).pipe(
          catchError(this.handleError),
          tap(resData => {
            this.http.get(`https://instacar-project-ee1a1-default-rtdb.firebaseio.com/users.json`).subscribe({
              next: (data: any) => {
                let userId: string;
                Object.entries(data).find(([id, profile]) => {
                  if((profile as any).email == resData.email) {
                    userId = id;
                }})
                const user = {...data[userId], id: userId};
                console.log(user, 'new user');

                this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  user.id,
                  user.posts || [],
                  resData.idToken,
                  +resData.expiresIn
                );
                this.router.navigate['/home'];
              }
            })
          })
        );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    profileId: string,
    posts: string[] = [],
    token: string,
    expiresIn: number
  ) {
    //string but give us exparation date in miliseconds
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //Data() convert to date object
    const user = new User(email, userId, profileId, posts, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  updatePosts(posts: string[]) {
    this.user.subscribe((userData: any) => {

      this.user.next({ ...userData, posts });
    })

  }
}

