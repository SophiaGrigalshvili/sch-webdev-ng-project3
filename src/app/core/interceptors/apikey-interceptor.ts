import { HttpInterceptorFn } from '@angular/common/http';

export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {
  const X_STEP_KEY: string = '97e6b798-b619-4777-9f97-fe6982567076';
  let newReq = req.clone({
    setHeaders: {
      'X-STEP-KEY': X_STEP_KEY,
    },
  });

  return next(newReq);
};
