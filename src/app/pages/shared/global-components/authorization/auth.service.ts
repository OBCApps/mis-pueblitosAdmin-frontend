import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  // --------- Autorizacion de la web
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = JSON.parse(sessionStorage.getItem('AuthorizacionMisPueblitosAdmin'));
      return token; // Retorna todo el objeto que esta dentro del SessionStorage
    }
  }

  setToken(token: any) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('AuthorizacionMisPueblitosAdmin', token);
    }
  }

  deleteToken() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('AuthorizacionMisPueblitosAdmin');
    }
  }

  // --------- Información temporal para el uso del portal
  setLocalData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('TempDataMisPueblitosAdmin', JSON.stringify(data));
    }
  }

  getLocalData() {
    if (isPlatformBrowser(this.platformId)) {
      const data = JSON.parse(localStorage.getItem('TempDataMisPueblitosAdmin'));
      return data; // Retorna todo el objeto que esta dentro del SessionStorage
    }
  }

  deleteLocalData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('TempDataMisPueblitosAdmin');
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}

