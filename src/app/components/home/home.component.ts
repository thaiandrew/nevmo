import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { AppService } from '../../app.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  user!: User;
  depositForm: any;
  withdrawForm: any;
  sendForm: any;

  constructor(private service: AppService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user = this.service.getUser();
    this.depositForm = this.formBuilder.group({
      deposit: ['0.00', [
        Validators.required,
        this.validDollarAmount()
      ]]
    });
    this.withdrawForm = this.formBuilder.group({
      withdraw: ['0.00', [
        Validators.required,
        this.validDollarAmount(),
        this.validSendAmount()
      ]]
    });
    this.sendForm = this.formBuilder.group({
      receiver: ['', [Validators.required]],
      sendAmount: ['0.00', [Validators.required,
        this.validDollarAmount(),
        this.validSendAmount()
      ]]
    });
  }

  deposit() {
    this.service.deposit(this.depositForm.value.deposit);
  }

  withdraw() {
    // Validate withdraw amount first before withdrawing
    this.service.withdraw(this.withdrawForm.value.withdraw);
  }

  send() {
    // Send money to an account
    // Verify that the account actually exists
    this.service.send(this.sendForm.value.receiver, this.sendForm.value.sendAmount);
  }

  validDollarAmount(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const amount = parseFloat(control.value);
        const decimalPlaces = amount.toString().split('.').length > 1 ? amount.toString().split('.')[1].length : 0;
  
      if (amount && amount > 0 && decimalPlaces <= 2) {
        return null;
      } else {
        return { validDollarAmount: false};
      }
    }
  }
  
  validSendAmount(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const amount = parseFloat(control.value);
  
      if (amount && amount > 0 && this.user.balance >= amount) {
        return null;
      } else {
        return { validSendAmount: false};
      }
    }
  }
}

