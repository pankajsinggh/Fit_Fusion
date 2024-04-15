
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallsService } from '../../../services/apicalls.service'; // Assuming ApiService is your service for API calls
import ValidateForm from '../../../helpers/validateform';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classifybmi',
  templateUrl: './classifybmi.component.html',
  styleUrls: ['./classifybmi.component.css']
})
export class ClassifybmiComponent implements OnInit {

  classifybmiForm!: FormGroup;
  result: string | undefined;
  result2: any | undefined;

  constructor(private fb: FormBuilder, private apiService: ApicallsService) { }

  ngOnInit(): void {
    this.classifybmiForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      age: ['', Validators.required]

    });
  }

  sendHeightWeightAndAgeToAPI(): void {
    if (this.classifybmiForm.valid) {
      const { height, weight,age } = this.classifybmiForm.value;
      this.apiService.classifyBMI( height, weight,age ).subscribe({
        next: (response : any) => {
          // Store BMI value received from the backend
           this.result = response.classification.result;
           this.result2 =  parseFloat(response.bmi).toFixed(2);
          console.log('Result:', response);
        },
        error: (error) => {
          // Handle error from the backend if needed
          console.error('Error from API:', error);
        }
      });
    } else {
      // Throw error with required field
      ValidateForm.validateAllFormFields(this.classifybmiForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your form is invalid',
      })    }
  }
}
