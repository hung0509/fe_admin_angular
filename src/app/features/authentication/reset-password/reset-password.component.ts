import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [FormsModule, TextInputComponent, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent {
  model: any = {email : ''};
  validationErrors: string[] = [];
  constructor(private accountService: AccountService, private router: Router) { }

  resetPassword() {
    this.accountService.resetPassword(this.model.email).subscribe({
      next: (response) => {
        // Dynamically access the 'encryptemail' property
        const encryptedEmail = response['encryptemail'];
        this.router.navigate(['/account/verify'], { queryParams: { encryptemail: encryptedEmail } });
      },
      error: (error) => this.validationErrors.push(error)
    });
  }
  
  
  
}
