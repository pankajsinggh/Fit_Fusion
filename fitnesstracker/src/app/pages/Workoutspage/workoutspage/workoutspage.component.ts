import { Component ,OnInit} from '@angular/core';
import { AddworkoutComponent } from '../../../components/addworkout/addworkout/addworkout.component';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-workoutspage',
  templateUrl: './workoutspage.component.html',
  styleUrl: './workoutspage.component.css'
})
export class WorkoutspageComponent  implements OnInit{
  constructor (private authservice :AuthService){}

  ngOnInit(): void {
    
  }

  isLoggedIn():boolean{
    return this.authservice.isLoggedIn();
  }
}
