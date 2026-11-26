import { HttpInterceptorFn } from '@angular/common/http';

export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {
  const X_STEP_KEY: string = 'd8a6d7f0-9ee6-4ff0-8c84-810fdb32442a';
  let newReq = req.clone({
    setHeaders: {
      'X-STEP-KEY': X_STEP_KEY,
    },
  });

  return next(newReq);
};
