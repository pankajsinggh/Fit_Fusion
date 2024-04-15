
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallsService } from '../../../services/apicalls.service'; // Assuming ApiService is your service for API calls
import ValidateForm from '../../../helpers/validateform';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addgoal',
  templateUrl: './addgoal.component.html',
  styleUrl: './addgoal.component.css'
})


export class AddgoalComponent implements OnInit {
  isLoggedIn: boolean =false;
  goalForm!: FormGroup;
  todayDate: string='';

  constructor(private fb: FormBuilder, private apiService: ApicallsService, private authService: AuthService,private router:Router ) { }

  ngOnInit(): void {
     this.isLoggedIn= this.authService.isLoggedIn();
     const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    this.todayDate = nextDay.toISOString().split('T')[0];
    this.goalForm = this.fb.group({
      goalType: ['',],
      targetMetric: ['', Validators.required],
      deadline: [''],
      createdDate: [new Date, Validators.required],
      progress:[0,Validators.required]

    });
  }
  
  onSubmit(): void {
    if(!this.isLoggedIn){
      alert('Please log in to add a workout.');
      return;
    }
    if (this.goalForm.valid) {

      const userDataString = localStorage.getItem('userData');
      if(!userDataString){
        console.error('User Data not Found');
        return;
      }
      const userData = JSON.parse(userDataString);
      const userId =userData.userId;

      const goalDTO ={
        userId : userId,
        ...this.goalForm.value
      }

      this.apiService.addGoal(goalDTO)
      .subscribe({
        next: (res => {
          console.log('Goal data sent to backend');
          Swal.fire({
            title: "Created",
            text: "Created Successfully",
            icon: "success"
          });
          this.goalForm.reset();

          // getGoalfetchGoals();
          this.router.navigate(['/goal']);
          console.log(res.message)
            // this.goals.fetchGoals();
          }),
         error: (error) => {
            console.error('Error adding goal:', error);
            alert('Failed to add goal');
          }
        });
    } else {
      ValidateForm.validateAllFormFields(this.goalForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your form is invalid',
      })      }
  }

  
}
