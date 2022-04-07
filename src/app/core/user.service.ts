import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { IUser } from './interfaces';


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
  user = new BehaviorSubject<IUser>(null); //get access to the current active user; null starting value
  token: string = null;


  constructor(private http: HttpClient) { }

  logout() {
    this.user.next(null);
  }
  register(username: string, email: string, password: string, rePassword: string) {
    return this.http
      .post<RegisterResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTU2lv0sZ-kvLAhaKSX_afxkJLnCD505o',
        {
          username: username,
          email: email,
          password: password,
          rePassword: rePassword,
          returnSecureToken: true //always should be true
        })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn //convert in number
          );
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
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    //string but give us exparation date in miliseconds
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //Data() convert to date object
    const user = new IUser(email, userId, token, expirationDate);
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

}

