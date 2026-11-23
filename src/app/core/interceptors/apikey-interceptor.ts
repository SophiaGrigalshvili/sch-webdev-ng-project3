import { HttpInterceptorFn } from '@angular/common/http';

export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {
  const X_STEP_KEY: string = '37925c70-d719-4f79-a988-bdfd6fe2bfc6';
  let newReq = req.clone({
    setHeaders: {
      'X-STEP-KEY': X_STEP_KEY,
    },
  });

  return next(newReq);
};
