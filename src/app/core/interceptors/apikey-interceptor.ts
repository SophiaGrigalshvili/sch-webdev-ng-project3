import { HttpInterceptorFn } from '@angular/common/http';

export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {
  const X_STEP_KEY: string = 'dffff663-5332-4f23-baf8-a4c61cd31889';
  let newReq = req.clone({
    setHeaders: {
      'X-STEP-KEY': X_STEP_KEY,
    },
  });

  return next(newReq);
};
