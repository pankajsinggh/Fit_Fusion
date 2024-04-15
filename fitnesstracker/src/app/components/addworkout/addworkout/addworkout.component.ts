import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallsService } from '../../../services/apicalls.service'; // Assuming ApiService is your service for API calls
import ValidateForm from '../../../helpers/validateform';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrl: './addworkout.component.css'
})


export class AddworkoutComponent implements OnInit {
  isLoggedIn: boolean =false;
  workoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApicallsService, private authService: AuthService,  ) { }

  ngOnInit(): void {
     this.isLoggedIn= this.authService.isLoggedIn();
    this.workoutForm = this.fb.group({
      date: ['', Validators.required],
      duration: ['', Validators.required],
      intensity: [''],
      caloriesBurned: ['', Validators.required],
      weightLifted: ['']

    });
  }
  parseDuration(duration: string): string {
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return `PT${hours}H${minutes}M${seconds}S`;
    } else {
      Swal.fire({
        title: "Incorrect Duration",
        text: "Duration format is not valid",
        icon: "error"
      })
      throw new Error('Invalid duration format');
    }
  }
  
  
  onSubmit(): void {
    if(!this.isLoggedIn){
      alert('Please log in to add a workout.');
      return;
    }
    if (this.workoutForm.valid) {
      
      const userDataString = localStorage.getItem('userData');
      if(!userDataString){
        console.error('User Data not Found');
        return;
      }
      const userData = JSON.parse(userDataString);
      const userId =userData.userId;
        let duration2 = this.parseDuration(this.workoutForm.value.duration)
        console.log(duration2)
      const workoutDTO ={
        userId : userId,
        ...this.workoutForm.value
      }

      this.apiService.addWorkout(workoutDTO)
      
      .subscribe({
        next: (res => {
    
            // console.log('Workouts',res);
            // localStorage.setItem('workoutsData',JSON.stringify(res));
          
          Swal.fire({
            title: "Added",
            text: "Added Successfully",
            icon: "success"
          });
          console.log(res.message)
            this.workoutForm.reset();
          }),
         error: (error) => {
            console.error('Error adding workout:', error);
            alert('Failed to add workout');
          }
        });
    } else {
      ValidateForm.validateAllFormFields(this.workoutForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your form is invalid',
      })      }
  }

 
}