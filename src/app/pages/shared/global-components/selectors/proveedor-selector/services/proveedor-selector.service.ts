import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_SERVICE_ADMIN } from '../../../../../../../environments/environment.prod';
import { FilterProveedor } from '../models/FilterProvedor';


@Injectable({
  providedIn: 'root',
})
export class ProveedorSelectorService {
  private API_SERVER_EVENTO = API_SERVICE_ADMIN + 'proveedor';

  constructor(private http: HttpClient) { }


  // -------- CRUD ENTIDADES ---------- \\
  /* search(data: FilterEvento): Observable<listFilterEvento[]> {
    return this.http.post<listFilterEvento[]>(this.API_SERVER_EVENTO + '/filter-list', data).pipe(
      map((response) => {
        return response;
      })
    );
  } */
  search(data: FilterProveedor): Observable<any[]> {
    return this.http.get<any[]>(this.API_SERVER_EVENTO).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
