
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallsService } from '../../../services/apicalls.service'; // Assuming ApiService is your service for API calls
import ValidateForm from '../../../helpers/validateform';

@Component({
  selector: 'app-bmicalculator',
  templateUrl: './bmicalculator.component.html',
  styleUrls: ['./bmicalculator.component.css']
})
export class BMICalculatorComponent implements OnInit {

  bmicalculatorForm!: FormGroup;
  bmiValue: number | undefined;

  constructor(private fb: FormBuilder, private apiService: ApicallsService) { }

  ngOnInit(): void {
    this.bmicalculatorForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  sendHeightAndWeightToAPI(): void {
    if (this.bmicalculatorForm.valid) {
      const { height, weight } = this.bmicalculatorForm.value;
      this.apiService.calculateBMI( height, weight ).subscribe({
        next: (response) => {
          // Store BMI value received from the backend
          this.bmiValue = parseFloat(response.toFixed(2));
          console.log('BMI value:', this.bmiValue);
        },
        error: (error) => {
          // Handle error from the backend if needed
          console.error('Error from API:', error);
        }
      });
    } else {
      // Throw error with required field
      ValidateForm.validateAllFormFields(this.bmicalculatorForm);
      alert("Your form is invalid");
    }
  }
}
