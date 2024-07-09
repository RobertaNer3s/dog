import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const customHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'x-api-key': environment.API_KEY
    }
  });

  return next(clonedRequest);
};
