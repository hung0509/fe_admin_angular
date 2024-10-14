import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { TextInputComponent } from "../../../shared/components/text-input/text-input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CalendarModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  validationErrors: string[] = [];
  maxYear: Date;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxYear = new Date();
    this.maxYear.setFullYear(this.maxYear.getFullYear() - 16);
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }
  
  register() {
    return this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: error =>  this.validationErrors = error
    });
    
  }
}
