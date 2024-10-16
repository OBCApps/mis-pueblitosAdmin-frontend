import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorizationService } from './auth.service';

import { LoginService } from '../../navigations/auths/login/services/login.service';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedUrls = []; // 'http://10.100.3.92:8098/interoperabilidad/sunedu/'

  constructor(
    private storage: AuthorizationService,
    private authService: LoginService,
    private toastService: ToastService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storage.getToken();

    let request = req;

    
    if (this.excludedUrls.some(url => req.url.startsWith(url))) {
      
      request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + 'f7e0b437-5153-4f3d-8d87-adee3e1680fb')
      });
    } else {
      
      if (token) {
        request = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token.token)
        });

        request = request.clone({
          headers: request.headers.set('Content-Type', 'application/json')
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403 || error.status === 400 ) {
          this.toastService.addToast({
            type: 'danger',
            message: 'Lo sentimos, no tienes permisos para acceder a este recurso.'
          });
          this.authService.redirectToLogin();
        }
        if (error.status === 0) {
          this.toastService.addToast({
            type: 'danger',
            message: 'No se pudo conectar con el servidor.'
          });
          this.authService.redirectToLogin();
        }

        return throwError(error);
      })
    );
  }
}
