


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApicallsService } from '../../../services/apicalls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-workouts',
  templateUrl: './get-workouts.component.html',
  styleUrls: ['./get-workouts.component.css']
})
export class GetWorkoutsComponent implements OnInit {
  isLoggedIn: boolean = false;
  workouts: any[] = [];

  constructor(private apiService: ApicallsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  fetchWorkouts(): void {
    if (!this.isLoggedIn) {
      alert('Please log in to view workouts.');
      return;
    }
    
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      console.error('User Data not Found');
      return;
    }
    
    const userData = JSON.parse(userDataString);
    const userId = userData.userId;

    this.apiService.getWorkouts(userId)
      .subscribe(
        (data: any) => {
          console.log('Workouts',data);
          this.workouts = data;
          
          localStorage.setItem('workoutsData',JSON.stringify(data));
        },
        (error: any) => {
          console.error('Error fetching workouts:', error);
        }
      );
  }

  // formatDates(workouts:any[]): any[]{
  //   return workouts.map(workout =>{
  //   workout.Date = this.formatDate(workout.Date);
  //   return workout;
  // });
  //   }

  //   formatDate(dateString:string):string{
  //     const date = new Date(dateString);
  //     return date.toISOString().slice(0,10);
  //   }

 

deleteWorkout(workoutId: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this Goal ??",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiService.deleteWorkout(workoutId).subscribe(() => {
      this.workouts=this.workouts.filter(workout=> workout.workoutId!==workoutId);

        Swal.fire(
          'Deleted!',
          'Your goal has been deleted.',
          'success'
        );
      }, (error) => {
        console.error('Error deleting goal:', error);
        Swal.fire(
          'Failed!',
          'There was an error deleting your goal.',
          'error'
        );
      });
    }
  });
}
  

}