import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-second-banner',
  templateUrl: './second-banner.component.html',
  styleUrl: './second-banner.component.css'
})
export class SecondBannerComponent  {
  constructor(public authService: AuthService) { }

}
