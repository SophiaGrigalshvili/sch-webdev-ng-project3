import { HttpInterceptorFn } from '@angular/common/http';

export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {
  const X_STEP_KEY: string = '9dd3309a-c57d-4874-898b-9f5ab804efa3';
  let newReq = req.clone({
    setHeaders: {
      X_STEP_KEY: X_STEP_KEY,
    },
  });

  return next(newReq);
};
