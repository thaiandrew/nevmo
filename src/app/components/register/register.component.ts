import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private service: AppService) {
  }

  registerForm: any;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const user = new User(this.registerForm.value.firstname, this.registerForm.value.lastname, this.registerForm.value.username, this.registerForm.value.password);
    this.service.setUser(user);
    this.router.navigate([
      'home'
    ]);
  }

}
