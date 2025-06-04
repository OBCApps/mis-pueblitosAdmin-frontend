import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';

import { FilterEvento } from '../models/FilterEvento';
import { FilterSubEvento } from '../models/FilterSubEvento';
import { DtoSubEvento } from '../models/DtoSubEvento';



@Injectable({
  providedIn: 'root',
})
export class SubEventoService {
  private API_SERVER_EVENTO = API_SERVICE_ADMIN + 'sub-evento';

  constructor(private http: HttpClient) { }

  // -------- LISTADO DE ENTIDADES ---------- \\
  get_listado_eventos(): Observable<DtoSubEvento[]> {
    return this.http.get<DtoSubEvento[]>(this.API_SERVER_EVENTO).pipe(
      map((response) => {
        return response;
      })
    );
  }

  search(data: FilterSubEvento): Observable<any> {
    return this.http.post<any>(this.API_SERVER_EVENTO + '/filter_pagination', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // -------- CRUD ENTIDADES ---------- \\
  getEventoByID(id: any): Observable<DtoSubEvento> {
    return this.http.get<DtoSubEvento>(this.API_SERVER_EVENTO + '/getByID/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
  create(data: any): Observable<DtoSubEvento> {
    return this.http.post<DtoSubEvento>(this.API_SERVER_EVENTO + '/register', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data: any): Observable<DtoSubEvento> {
    return this.http
      .patch<DtoSubEvento>(this.API_SERVER_EVENTO + '/update/' + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(data: any): Observable<any> {
    return this.http.delete<any>(this.API_SERVER_EVENTO + '/delete/' + data.id).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
