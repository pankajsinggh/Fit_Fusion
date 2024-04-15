


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
// import { NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  isNavbarOpen = false;
  toggleNavbar(){
    console.log("Toggler clicked");
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  constructor(public authService: AuthService ){}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
  }

  logout(): void {
    // this.toast.error({
    //   detail:"Logged Out",
    //   summary:"Sucessfull",
    //   duration:3000,
    //   position:"topCenter"
    // });

    this.authService.logout();
    this.isLoggedIn = false;
    this.username = '';
  }
}