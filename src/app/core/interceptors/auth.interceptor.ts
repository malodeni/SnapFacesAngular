// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer my-token'
    }
  });
  return next(authReq);
};
