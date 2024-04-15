import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallsService } from '../../../services/apicalls.service'; // Assuming ApiService is your service for API calls
import ValidateForm from '../../../helpers/validateform';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bmi',
  templateUrl: './add-bmi.component.html',
  styleUrl: './add-bmi.component.css'
})
export class AddBMIComponent implements OnInit{

  isLoggedIn: boolean =false;
  bmiForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApicallsService, private authService: AuthService,  ) { }

  ngOnInit(): void {
     this.isLoggedIn= this.authService.isLoggedIn();
    this.bmiForm = this.fb.group({
      bmi: ['', Validators.required],
      recordedDate: ['', Validators.required],
    });
  }
  
  onSubmit(): void {
    if(!this.isLoggedIn){
      alert('Please log in to add a workout.');
      return;
    }
    if (this.bmiForm.valid) {

      const userDataString = localStorage.getItem('userData');
      if(!userDataString){
        console.error('User Data not Found');
        return;
      }
      const userData = JSON.parse(userDataString);
      const userId =userData.userId;

      const bmiRecordDTO ={
        userId : userId,
        ...this.bmiForm.value
      }

      this.apiService.addBMI(bmiRecordDTO)
      
      .subscribe({
        next: (res => {
          Swal.fire({
            title: "Added",
            text: "Added Successfully",
            icon: "success"
          });
          // console.log('Goal data sent to backend');
          console.log(res)
            this.bmiForm.reset();
          }),
         error: (error) => {
            console.error('Error adding bmi:', error);
            alert('Failed to add bmi');
          }
        });
    } else {
      ValidateForm.validateAllFormFields(this.bmiForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your form is invalid',
      })      }
  }

  
}

