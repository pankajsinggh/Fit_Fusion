import { Component, OnInit } from '@angular/core';
import { BMICalculatorComponent } from '../../../components/bmicalculator/bmicalculator/bmicalculator.component';
import { ClassifybmiComponent } from '../../../components/classifybmi/classifybmi/classifybmi.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-bmispage',
  templateUrl: './bmispage.component.html',
  styleUrl: './bmispage.component.css'
})
export class BMIspageComponent implements OnInit {
  constructor (private authservice :AuthService){}

  ngOnInit(): void {
    
  }

  isLoggedIn():boolean{
    return this.authservice.isLoggedIn();
  }
}
