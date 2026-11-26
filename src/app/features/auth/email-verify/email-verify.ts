import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth-service';
import { Component, inject } from '@angular/core';
import { IVerifyMailRequest } from '../../../core/models/iauth';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-email-verify',
  styleUrl: './email-verify.scss',
  templateUrl: './email-verify.html',
})
export class EmailVerify {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  verificationForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required]],
  });

  get email() {
    return this.verificationForm.controls['email'];
  }

  get code() {
    return this.verificationForm.controls['code'];
  }

  onSubmit() {
    const userCode: IVerifyMailRequest = {
      email: this.verificationForm.value.email,
      code: this.verificationForm.value.code,
    };

    this.authService.onVerification(userCode);
  }
}
