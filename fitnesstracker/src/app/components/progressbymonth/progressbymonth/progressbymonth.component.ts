// import { Component } from '@angular/core';
// import { ApicallsService } from '../../../services/apicalls.service';

// @Component({
//   selector: 'app-progressbymonth',
//   templateUrl: './progressbymonth.component.html',
//   styleUrl: './progressbymonth.component.css'
// })
// export class ProgressbymonthComponent {

//   selectedYear: number;
//   selectedMonth: number;
//   bmiRecords: any[];
//   userId: number;

//   constructor(private apiService: ApicallsService) {
//     const userDataString = localStorage.getItem('userData');
//     if (userDataString) {
//       const userData = JSON.parse(userDataString);
//       this.userId = userData.userId;
//     }
//   }

//   getBMIRecords(): void {
//     if (!this.selectedYear || !this.selectedMonth) {
//       console.error('Please select both year and month.');
//       return;
//     }

//     if (!this.userId) {
//       console.error('User ID not found.');
//       return;
//     }

//     this.apiService.getBMIRecordsByMonth(this.userId, this.selectedYear, this.selectedMonth)
//       .subscribe(
//         (data: any[]) => {
//           this.bmiRecords = data;
//         },
//         (error: any) => {
//           console.error('Error fetching BMI records:', error);
//         }
//       );
//   }
// }