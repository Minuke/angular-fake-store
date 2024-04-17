import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleErrorResponse));
};

function handleErrorResponse(error:HttpErrorResponse): ReturnType<typeof throwError> {
  const errorResponse = `Error: ${error.status}, message: ${error.message}`;
  return throwError(() => errorResponse)
}
