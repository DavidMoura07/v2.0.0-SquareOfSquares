import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
    count: number;
    data: T;
    error: boolean
}

@Injectable()
export class FormatResponse<T> implements NestInterceptor<T, Response<T>> {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(

      catchError(err => {
        err.response = {
          data: {message: err.response?.message || err.response},
          error: true
        }
        return throwError(err)
      }),
      
      map(data => ({
        count: Array.isArray(data) ? data.length : undefined,
        data,
        error: data.error ? true : false,
      })),

    );
  }
}