import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_SERVICE_SEGURIDAD = "API_SERVICE_SEGURIDAD ";
  private user = this.API_SERVICE_SEGURIDAD + '/user';
 
  constructor(
    private http: HttpClient,
    private router: Router
  ) { } 

  login(data : any): Observable<any> {       
    return this.http.post<any>(this.user + '/login' , data);
  }

  sent_email_recovery_service(data: any): Observable<any> {
    return this.http.post<any>(this.API_SERVICE_SEGURIDAD + '/recuperarclave', data);
  }

  change_password_recovery_service(data: any): Observable<any> {
    return this.http.post<any>(this.API_SERVICE_SEGURIDAD + '/recuperarclave', data);
  }

  cambiarClave(data: any): Observable<any> {
    return this.http.post<any>(this.API_SERVICE_SEGURIDAD + '/cambiarclave', data);
  }


  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
