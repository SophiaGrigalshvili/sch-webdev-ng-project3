import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IChangePasswordRequest,
  IChangePasswordResponse,
  IUser,
  IUserMetaData,
  IUserProfile,
} from '../models/iuser';
import { AuthService } from './auth-service';

@Service()
export class UserService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://restaurantapi.stepacademy.ge';
  private router = inject(Router);

  authService = inject(AuthService);

  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  userData = signal<IUser | null>(null);
  userProfileData = signal<IUserProfile | null>(null);

  getUser() {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.get<IUserMetaData>(`${this.BASE_URL}/api/users/me`).subscribe({
      next: (data) => {
        this.userData.set(data.data);
        console.log('user is logged in', this.userData());

        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('error in getting user', err);
        this.errorMsg.set('error in getting user');

        this.isLoading.set(false);
      },
    });
  }

  getUserProfile() {
    this.isLoading.set(true);
    this.errorMsg.set(null);
  }

  updatePassword(passwordData: IChangePasswordRequest) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http
      .put<IChangePasswordResponse>(`${this.BASE_URL}/api/users/change-password`, passwordData)
      .subscribe({
        next: (data) => {
          console.log('-----------------------------');
          console.log(data);

          if (!data.isSuccess) {
            this.errorMsg.set(data.error.message);
            console.log(this.errorMsg());

            this.isLoading.set(false);
          } else {
            console.log('password successfully changed');

            this.isLoading.set(false);
          }
        },
        error: (err) => {
          console.log('-------------------------------');

          console.log('error changing password', err);
          this.errorMsg.set(err.error.detail);
          console.log(this.errorMsg());

          this.isLoading.set(false);
        },
      });
  }

  deleteAccount() {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.delete<any>(`${this.BASE_URL}/api/users/delete`).subscribe({
      next: (data) => {
        console.log(data);

        if (data.isSuccess) {
          console.log('deleted sucessfully');
        } else {
          console.log('coudlnt delete');
        }
        this.authService.access_token.set(null);
        this.authService.refresh_token.set(null);

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');

        this.isLoading.set(false);
        this.router.navigate([`/`]);
      },
      error: (err) => {
        console.log(err);
        this.errorMsg.set(err.error.detail);

        this.isLoading.set(false);
      },
    });
  }
}
