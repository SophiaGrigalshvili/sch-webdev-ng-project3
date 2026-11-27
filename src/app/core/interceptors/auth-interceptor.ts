import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

const authenticatedEndpoints = ['users', 'cart'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const needAuth = authenticatedEndpoints.some((endpoint) =>
    req.url.startsWith(`https://restaurantapi.stepacademy.ge/api/${endpoint}`),
  );

  const accessToken = authService.access_token();

  if (needAuth && accessToken) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
  }

  return next(req);
};
