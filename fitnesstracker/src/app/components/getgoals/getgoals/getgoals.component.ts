
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApicallsService } from '../../../services/apicalls.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-getgoals',
  templateUrl: './getgoals.component.html',
  styleUrl: './getgoals.component.css'
})


export class GetgoalsComponent implements OnInit {
  isLoggedIn: boolean = false;
  goals: any[] = [];
  errorMessage: string ='';
  showAddGoalForm:boolean=false;


  constructor(
    private apiService: ApicallsService,
     private authService: AuthService,
      private router : Router    ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
      this.fetchGoals();
    }
    this.goals.forEach(goal=>goal.progressToAdd=0);
  }

  fetchGoals(): void {
    if (!this.isLoggedIn) {
      alert('Please log in to view goals.');
      return;
    }
    
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      console.error('User Data not Found');
      return;
    }
    
    const userData = JSON.parse(userDataString);
    const userId = userData.userId;

    this.apiService.getGoals(userId)
      .subscribe({
        next:
        (data: any) => {
          console.log('Goals',data);
          this.goals = this.formatDates(data);
          localStorage.setItem('goalsData',JSON.stringify(data));
        },
        error:
        (error: any) => {
          console.error('Error fetching goals:', error);
        }
  });
  }

            formatDates(goals:any[]): any[]{
            return goals.map(goal =>{
            goal.createdDate = this.formatDate(goal.createdDate);
            goal.deadline=this.formatDate(goal.deadline);
            return goal;
          });
            }

            formatDate(dateString:string):string{
              const date = new Date(dateString);
              return date.toISOString().slice(0,10);
            }
 



deleteGoal(goalId: number): void {
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
      this.apiService.deleteGoal(goalId).subscribe(() => {
        this.goals = this.goals.filter(goal => goal.goalId !== goalId);

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


updateProgress(goalId: number, progress: number): void {
  // Fetch user id from localStorage
  const userDataString = localStorage.getItem('userData');
  if (!userDataString) {
    console.error('User Data not Found');
    return;
  }
  const userData = JSON.parse(userDataString);
  const userId = userData.userId;

  // Call the service to update progress
  this.apiService.updateProgressToGoal(userId,goalId, progress)
    .subscribe({
      next:
      (response :any) => {

        Swal.fire(
          'Updated!',
          'Your progress has been updated.',
          'success'
        );

        console.log('Progress updated successfully:', response);
        // Update goals list after successful update
        this.fetchGoals();
        // this.router.navigate(['/goal']);

      },
      error:
      (error) => {
        console.error('Error updating progress:', error);
        this.errorMessage =error.error || 'An error occured while updating progress.';
        if(error.error === "Progress cannot exceed the target metric"){
          // alert("Progress cannot exceed the target metric");
          Swal.fire(
            'Unable to Update',
            'Progress cannot exceed the target metric',
            'error'
          );
        }
      }
});
}

getCompletionPercentage(goal:any):number{
return parseFloat((Math.min((goal.progress/goal.targetMetric)*100,100)).toFixed(2));

}
 openAddGoalForm():void{
  this.showAddGoalForm=true;
 }
//  closeAddGoalForm():void
// {
//   this.showAddGoalForm= false;
// }
}
