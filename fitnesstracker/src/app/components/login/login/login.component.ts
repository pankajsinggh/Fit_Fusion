import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../../../helpers/validateform';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginauth(email, password)
        .subscribe({
          next: (res) => {
            // localStorage.setItem('token',JSON.stringify(res.token));
            localStorage.setItem('userData', JSON.stringify(res.user));
            this.loginForm.reset();
            this.router.navigate([''])
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err?.error.message
            })          }
        })
      //send object to datyabase
    }
    else {
      //throw error with required field
      ValidateForm.validateAllFormFields(this.loginForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your form is invalid',
      })
    }
  }

}
