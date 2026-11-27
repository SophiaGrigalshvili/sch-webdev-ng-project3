import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILoginMetaDataResp,
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterRequest,
  IRegisterResponce,
  IVerifyMailRequest,
} from '../models/iauth';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://restaurantapi.stepacademy.ge';
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  access_token = signal<string | null>(null);
  refresh_token = signal<string | null>(null);
  isRemember = signal<boolean>(false);

  isLoggedIn = computed(() => this.access_token());

  constructor() {
    if (sessionStorage.getItem('access_token')) {
      this.access_token.set(sessionStorage.getItem('access_token'));
      this.refresh_token.set(sessionStorage.getItem('refresh_token'));
    } else {
      this.access_token.set(localStorage.getItem('access_token'));
      this.refresh_token.set(localStorage.getItem('refresh_token'));
    }
  }

  onRegister(userData: IRegisterRequest) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.post<IRegisterResponce>(`${this.BASE_URL}/api/auth/register`, userData).subscribe({
      next: (data) => {
        console.log('signed up sucessfully', data);
        this.isLoading.set(false);

        this.router.navigate(['/verify']);
      },
      error: (err) => {
        console.log('registration error:', err);

        this.errorMsg.set(err.error.detail);
        this.isLoading.set(false);
      },
    });
  }

  onLogin(userData: ILoginRequest) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.post<ILoginMetaDataResp>(`${this.BASE_URL}/api/auth/login`, userData).subscribe({
      next: (data) => {
        this.access_token.set(data.data.accessToken);
        this.refresh_token.set(data.data.refreshToken);

        const aToken = data.data.accessToken;
        const rToken = data.data.refreshToken;

        if (this.isRemember()) {
          localStorage.setItem('access_token', aToken);
          localStorage.setItem('refresh_token', rToken);
        } else {
          sessionStorage.setItem('access_token', aToken);
          sessionStorage.setItem('refresh_token', rToken);
        }

        // console.log(this.access_token());
        // console.log(this.refresh_token());
        // console.log('data from meta');
        // console.log(data.data.accessToken);
        // console.log(data.data.refreshToken);

        // console.log('------------------------------------');

        if (!data.data.isVerified) {
          this.isLoading.set(false);
          this.router.navigate(['/verify']);
        }

        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('login error:', err);
        this.errorMsg.set(err.error.detail);
        console.log(this.errorMsg());

        this.isLoading.set(false);
      },
    });
  }

  onVerification(userData: IVerifyMailRequest) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.put<ILoginResponse>(`${this.BASE_URL}/api/auth/verify-email`, userData).subscribe({
      next: (data) => {
        console.log('verified sucessfully');
        this.router.navigate([`/`]);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('verification error:', err);
        this.errorMsg.set('couldnt verify account');

        this.isLoading.set(false);
      },
    });
  }

  resendVerificationCode(email: string) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http
      .post<any>(`${this.BASE_URL}/api/auth/resend-email-verification/${email}`, email)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log('code resend error:', err);
          this.errorMsg.set('err.error.detail');

          this.isLoading.set(false);
        },
      });
  }

  refreshAccessToken() {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    if (this.refresh_token() == null) {
      console.error('coudlnt find refresh token');
      this.errorMsg.set('couldnt find account. please log in again.');

      this.isLoading.set(false);
    } else {
      this.http
        .post<ILoginMetaDataResp>(
          `${this.BASE_URL}/api/auth/refresh-access-token/${this.refresh_token()}`,
          this.refresh_token(),
        )
        .subscribe({
          next: (data) => {
            const aToken = data.data.accessToken;
            const rToken = data.data.refreshToken;

            if (this.isRemember()) {
              localStorage.setItem('access_token', aToken);
              localStorage.setItem('refresh_token', rToken);
            } else {
              sessionStorage.setItem('access_token', aToken);
              sessionStorage.setItem('refresh_token', rToken);
            }

            if (!data.data.isVerified) {
              this.isLoading.set(false);
              this.router.navigate(['/verify']);
            }

            this.isLoading.set(false);
          },
          error: (err) => {
            console.log('refresh token:', err);
            this.errorMsg.set(err.error.detail);

            this.isLoading.set(false);
          },
        });
    }
  }

  logout() {
    this.access_token.set(null);
    this.refresh_token.set(null);

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}
