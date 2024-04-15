import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GetgoalsComponent } from '../../../components/getgoals/getgoals/getgoals.component';
@Component({
  selector: 'app-goalspage',
  templateUrl: './goalspage.component.html',
  styleUrl: './goalspage.component.css'
})
export class GoalspageComponent implements OnInit{

  constructor (private authservice :AuthService){}

  ngOnInit(): void {
    
  }

  isLoggedIn():boolean{
    return this.authservice.isLoggedIn();
  }

}
