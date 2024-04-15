import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApicallsService } from '../../../services/apicalls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-bmis',
  templateUrl: './get-bmis.component.html',
  styleUrl: './get-bmis.component.css'
})
export class GetBMIsComponent  implements OnInit{


  isLoggedIn: boolean = false;
  bmis: any[] = [];

  constructor(private apiService: ApicallsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  fetchbmis(): void {
    if (!this.isLoggedIn) {
      alert('Please log in to view BMIs.');
      return;
    }
    
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      console.error('User Data not Found');
      return;
    }
    
    const userData = JSON.parse(userDataString);
    const userId = userData.userId;

    this.apiService.getBMIs(userId)
      .subscribe(
        (data: any) => {
          console.log('BMIs',data);
          this.bmis = data;
          localStorage.setItem('bmisData',JSON.stringify(data));
        },
        (error: any) => {
          console.error('Error fetching bmis:', error);
        }
      );
  }

 


   
deletebmi(bmiRecordId: number): void {
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
      this.apiService.deletebmi(bmiRecordId).subscribe(() => {
       this.bmis=this.bmis.filter(bmi=> bmi.bmiRecordId!==bmiRecordId);

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