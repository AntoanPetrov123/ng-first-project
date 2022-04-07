import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  private userSub: Subscription;

  constructor(public userService: UserService, private router: Router) { }

 

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe( user => {
      this.isLoggedIn = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.userService.logout();
  }
}
