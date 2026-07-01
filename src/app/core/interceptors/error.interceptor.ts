import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService :MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        const message = error.error?.message || error.message || 'Error inesperado'
        this.messageService.add({
          severity : 'error',
          summary : 'Error',
          detail : message
        })
        return throwError(()=>error)
      })
    );
  }
}
