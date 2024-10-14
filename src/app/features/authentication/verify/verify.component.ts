import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AccountService } from "../../../core/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { verify } from "../../../models/verify";

@Component({
    selector: 'app-verify',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './verify.component.html',
    styleUrl: './verify.component.css'
  })
  
  export class verifyComponent implements AfterViewInit, OnInit{
    digit1: number;
    digit2: number;
    digit3: number;
    digit4: number;
    encryptemail: string;
    verify_obj : verify;
    validationErrors: string[] = [];
    constructor(private accountService: AccountService, private router: ActivatedRoute, private route: Router) { }
  
    verify(){
      const otp = `${this.digit1}${this.digit2}${this.digit3}${this.digit4}`;
      this.verify_obj = {
        email: this.encryptemail,
        OtpNumberVerify: parseInt(otp),
        updateAt: new Date()
      };
      console.log(this.verify_obj.updateAt);
      this.accountService.verifyOtp(this.verify_obj).subscribe({
        next: (response) => {
          // Dynamically access the 'encryptemail' property
          const encryptedEmail = response['encryptemail'];
          this.route.navigate(['/account/set-pass'], { queryParams: { encryptemail: encryptedEmail } });
        },
        error: (error) => this.validationErrors.push(error)
      });
    }

    ngOnInit() {
      this.router.queryParams.subscribe(params => {
        this.encryptemail = params['encryptemail'];
        console.log('Received encrypted email:', this.encryptemail); // Sử dụng tham số encryptemail ở đây
      });
    }

    ngAfterViewInit() {
        const inputs = document.querySelectorAll<HTMLInputElement>("input");
        const button = document.querySelector<HTMLButtonElement>("button");
    
        // iterate over all inputs
        inputs.forEach((input, index1) => {
          input.addEventListener("keyup", (e: KeyboardEvent) => {
            // This code gets the current input element and stores it in the currentInput variable
            // This code gets the next sibling element of the current input element and stores it in the nextInput variable
            // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
            const currentInput = input;
            const nextInput = input.nextElementSibling as HTMLInputElement | null;
            const prevInput = input.previousElementSibling as HTMLInputElement | null;
    
            // if the value has more than one character then clear it
            if (currentInput.value.length > 1) {
              currentInput.value = "";
              return;
            }
    
            // if the next input is disabled and the current value is not empty
            // enable the next input and focus on it
            if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
              nextInput.removeAttribute("disabled");
              nextInput.focus();
            }
    
            // if the backspace key is pressed
            if (e.key === "Backspace") {
              // iterate over all inputs again
              inputs.forEach((input, index2) => {
                // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
                // and the previous element exists, set the disabled attribute on the input and focus on the previous element
                if (index1 <= index2 && prevInput) {
                  input.setAttribute("disabled", "true");
                  input.value = "";
                  prevInput.focus();
                }
              });
            }
    
            // if the fourth input (which index number is 3) is not empty and has no disabled attribute then
            // add active class, if not then remove the active class.
            if (!inputs[3].disabled && inputs[3].value !== "") {
              button.classList.add("active");
              return;
            }
              button.classList.remove("active");
          
           
          });
        });
    
        // focus the first input which index is 0 on window load
        window.addEventListener("load", () => inputs[0].focus());
    }

    

  }
  