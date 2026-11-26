import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth-service';
import { Component, inject } from '@angular/core';
import { email } from '@angular/forms/signals';
import { ILoginRequest } from '../../../core/models/iauth';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [''],
  });

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  onSubmit() {
    this.authService.isRemember.set(this.loginForm.value.remember);
    const userCredentials: ILoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.onLogin(userCredentials);
    this.loginForm.reset();
  }
}
