import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://restaurantapi.stepacademy.ge';
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);
}
