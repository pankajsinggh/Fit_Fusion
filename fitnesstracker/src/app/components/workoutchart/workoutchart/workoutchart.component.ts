


// import { Component, OnInit } from '@angular/core';
// import { ApicallsService } from '../../../services/apicalls.service';
// import Chart from 'chart.js/auto';

// @Component({
//   selector: 'app-workoutchart',
//   templateUrl: './workoutchart.component.html',
//   styleUrls: ['./workoutchart.component.css']
// })
// export class WorkoutchartComponent implements OnInit {
//   durationChart: any;
//   caloriesChart: any;
//   weightChart: any;
//   workouts: any[] = [];

//   constructor(private apiService: ApicallsService) { }

//   ngOnInit(): void {
//     this.fetchWorkouts();
//   }

//   fetchWorkouts(): void {
//     const workoutsDataString = localStorage.getItem('workoutsData');
//     if (!workoutsDataString) {
//       console.error('Workouts data not found in local storage');
//       return;
//     }

//     const workoutsData = JSON.parse(workoutsDataString);
//     this.workouts = workoutsData;

//     const labels = this.workouts.map(workout => workout.date);
//     const durationsinMinutes = this.workouts.map(workout => this.convertDurationToMinutes(workout.duration));
//     const calories = this.workouts.map(workout => workout.caloriesBurned);
//     const weightLifted = this.workouts.map(workout => workout.weightLifted);

//     this.createDurationChart(labels, durationsinMinutes);
//     this.createCaloriesChart(labels, calories);
//     this.createWeightChart(labels, weightLifted);
//   }

//   createDurationChart(labels: string[], durations: number[]): void {
//     this.durationChart = new Chart('durationChart', {
//       type: 'line',
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: 'Duration (HH:MM:SS)',
//             data: durations,
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         },
//         animation: {
//           duration: 2000,
//           easing: 'easeInOutQuart'
//         }
//       }
//     });
//   }

//   createCaloriesChart(labels: string[], calories: number[]): void {
//     this.caloriesChart = new Chart('caloriesChart', {
//       type: 'line',
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: 'Calories Burned',
//             data: calories,
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         },
//         animation: {
//           duration: 2000,
//           easing: 'easeInOutQuart'
//         }
//       }
//     });
//   }

//   createWeightChart(labels: string[], weightLifted: number[]): void {
//     this.weightChart = new Chart('weightChart', {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: 'Weight Lifted (kg)',
//             data: weightLifted,
//             backgroundColor: 'rgba(255, 206, 86, 0.5)',
//             borderColor: 'rgba(255, 206, 86, 1)',
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         },
//         animation: {
//           duration: 2000,
//           easing: 'easeInOutQuart'
//         }
//       }
//     });
//   }

//   convertDurationToMinutes(duration: string): number {
//     const parts = duration.split(':');
//     return (+parts[0]) * 60 + (+parts[1]) + (+parts[2]) / 60;
//   }

//   convertMinutesToHHMMSS(minutes: number): string {
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     const seconds = Math.floor((remainingMinutes % 1) * 60);
//     return `${this.padZero(hours)}:${this.padZero(remainingMinutes)}:${this.padZero(seconds)}`;
//   }

//   padZero(num: number): string {
//     return num < 10 ? `0${num}` : `${num}`;
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ApicallsService } from '../../../services/apicalls.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-workoutchart',
  templateUrl: './workoutchart.component.html',
  styleUrls: ['./workoutchart.component.css']
})
export class WorkoutchartComponent implements OnInit {
  durationChart: any;
  caloriesChart: any;
  weightChart: any;
  workouts: any[] = [];

  constructor(private apiService: ApicallsService) { }

  ngOnInit(): void {
    this.fetchWorkouts();
  }

  fetchWorkouts(): void {
    const workoutsDataString = localStorage.getItem('workoutsData');
    if (!workoutsDataString) {
      console.error('Workouts data not found in local storage');
      return;
    }

    const workoutsData = JSON.parse(workoutsDataString);
    this.workouts = this.formatDates(workoutsData);

    const labels = this.workouts.map(workout => workout.date);
    const durationsinMinutes = this.workouts.map(workout => this.convertDurationToMinutes(workout.duration));
    const calories = this.workouts.map(workout => workout.caloriesBurned);
    const weightLifted = this.workouts.map(workout => workout.weightLifted);

    this.createDurationChart(labels, durationsinMinutes);
    this.createCaloriesChart(labels, calories);
    this.createWeightChart(labels, weightLifted);
  }

  createDurationChart(labels: string[], durations: number[]): void {
    this.durationChart = new ApexCharts(document.getElementById('durationChart'), {
      chart: {
        type: 'line',
      },
      series: [{
        name: 'Duration (HH:MM:SS)',
        data: durations,
      }],
      xaxis: {
        categories: labels,
      },
    });
    this.durationChart.render();
  }

  createCaloriesChart(labels: string[], calories: number[]): void {
    this.caloriesChart = new ApexCharts(document.getElementById('caloriesChart'), {
      chart: {
        type: 'line',
      },
      series: [{
        name: 'Calories Burned',
        data: calories,
      }],
      xaxis: {
        categories: labels,
      },
    });
    this.caloriesChart.render();
  }

  createWeightChart(labels: string[], weightLifted: number[]): void {
    this.weightChart = new ApexCharts(document.getElementById('weightChart'), {
      chart: {
        type: 'bar',
      },
      series: [{
        name: 'Weight Lifted (kg)',
        data: weightLifted,
      }],
      xaxis: {
        categories: labels,
      },
    });
    this.weightChart.render();
  }

  convertDurationToMinutes(duration: string): any {
    const parts = duration.split(':');
    return (+parts[0]) * 60 + (+parts[1]) + (+parts[2]) / 60;
        
  }

  formatDates(workouts:any[]): any[]{
    return workouts.map(workout =>{
    workout.date = this.formatDate(workout.date);
    return workout;
  });
    }

    formatDate(dateString:string):string{
      const date = new Date(dateString);
      return date.toISOString().slice(0,10);
    }

}