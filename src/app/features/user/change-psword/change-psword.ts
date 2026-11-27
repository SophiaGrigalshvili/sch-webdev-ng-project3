import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-change-psword',
  styleUrl: './change-psword.scss',
  templateUrl: './change-psword.html',
})
export class ChangePsword {
  userService = inject(UserService);
  private fb = inject(FormBuilder);

  changePasswordForm: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(36),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,36}$/),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  get oldPassword() {
    return this.changePasswordForm.controls['oldPassword'];
  }

  get newPassword() {
    return this.changePasswordForm.controls['newPassword'];
  }

  get confirmPassword() {
    return this.changePasswordForm.controls['confirmPassword'];
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      console.log('not right bruh');

      return;
    }

    this.userService.updatePassword(this.changePasswordForm.value);
    console.log('form done');
  }
}
