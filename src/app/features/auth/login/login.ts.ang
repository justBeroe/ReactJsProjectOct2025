import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
   private formBuilder = inject(FormBuilder);

  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginFormGroup = this.fb.group({      
      email: ['dobromirtt@gmail.com', Validators.required],
      password: ['123', Validators.required]
    });

  }

  // email: string = '';
  // password: string = '';

  // emailError: boolean = false;
  // emailErrorMessage: string = '';

  // passwordError: boolean = false;
  // passwordErrorMessage: string = '';

  // validateEmail(): void {

  //   if (!this.email) {
  //     this.emailError = true;
  //     this.emailErrorMessage = 'Email is required!';
  //   } else if (!this.isValidEmail(this.email)) {
  //     this.emailError = true;
  //     this.emailErrorMessage = 'Email is not valid!';

  //   } else {
  //     this.emailError = false;
  //     this.emailErrorMessage = '';
  //   }
  // }


  // validatePassword(): void {

  //   if (!this.password) {
  //     this.passwordError = true;
  //     this.passwordErrorMessage = 'Password is required!';
  //   }
  //   else if (this.password.length < 4) {
  //     this.passwordError = true;
  //     this.passwordErrorMessage = 'Password must be at least 4 characters!';
  //   } else {
  //     this.passwordError = false;
  //     this.passwordErrorMessage = '';
  //   }

  // }

  isFormValid(): boolean {

    // return Boolean(this.email) && Boolean(this.password) && !this.emailError && !this.passwordError;
    return true;
  }

  // onSubmit(): void {
  //   // this.validateEmail();
  //   // this.validatePassword();

  //   if (this.isFormValid()) {
  //     const response = this.authService.login(this.email, this.password);

  //     if (response === true) {
  //       this.router.navigate(['/home']);
  //     }
  //   }
  // }

  onSubmit(): void {

  if (this.loginFormGroup.valid) {
    const formValues = this.loginFormGroup.value;
      console.log('Submitted form values:', formValues);

      // Destructure values
      const {  email, password } = formValues;
    
    this.authService.login(email, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      } else {
        alert('Login failed - 401 Unauthorized');
      }
    });
  }
  
}


  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // const emailRegex = /^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/;
    return emailRegex.test(email);
  }
}