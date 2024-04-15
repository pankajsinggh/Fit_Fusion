import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../../../helpers/validateform';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  type: string = 'password';
  isText: boolean = false;
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
    
      
      if(this.signUpForm.value.password != this.signUpForm.value.confirmPassword){
        Swal.fire('Invalid Password','Password and Confirm password do not match','warning')
        
      }
     
      else{
      // Send object to the database
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Registered",
            text: "Successfully Registered",
            icon: "success"
          });
          console.log(res);
          this.signUpForm.reset();
          this.router.navigate(['loginpage']);
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Unable to register',
            text: 'Unable to register the new user'
          })   
        }
      })
      console.log(this.signUpForm.value)
    }
    } else {
      // Display error using toaster
      ValidateForm.validateAllFormFields(this.signUpForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your form is invalid',
      })
    }
  
  }
}