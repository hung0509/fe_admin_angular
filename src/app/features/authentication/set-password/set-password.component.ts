import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { setUser } from '../../../models/verify';

@Component({
  selector: 'app-set-pass',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'] // Corrected styleUrls
})
export class SetPassComponent implements OnInit {
  encryptemail: string;
  user: setUser;
  setPassForm: FormGroup; // Corrected form group name
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.router.queryParams.subscribe(params => {
      this.encryptemail = params['encryptemail'];
      console.log('Received encrypted email:', this.encryptemail); // Sử dụng tham số encryptemail ở đây
    });

    this.setPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.setPassForm.controls.password.valueChanges.subscribe(() => {
      this.setPassForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true };
    };
  }

  setPass() {
    this.user = {
      email : this.encryptemail,
      password: this.setPassForm.controls.password.value
    }
    return this.accountService.setPass(this.user).subscribe({
      next: () => this.route.navigateByUrl('/account/login'),
      error: error =>  this.validationErrors = error
  });
  }
}
