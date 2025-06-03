import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';

import { FilterEvento } from '../models/FilterEvento';
import { DtoEvento } from '../models/DtoEventos';


@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private API_SERVER_EVENTO = API_SERVICE_ADMIN + 'evento/';

  constructor(private http: HttpClient) { }

  // -------- LISTADO DE ENTIDADES ---------- \\
  get_listado_eventos(): Observable<DtoEvento[]> {
    return this.http.get<DtoEvento[]>(this.API_SERVER_EVENTO).pipe(
      map((response) => {
        return response;
      })
    );
  }

  search(data: FilterEvento): Observable<any> {
    return this.http.post<any>(this.API_SERVER_EVENTO + 'filter_pagination', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // -------- CRUD ENTIDADES ---------- \\
  getEventoByID(id: any): Observable<DtoEvento> {
    return this.http.get<DtoEvento>(this.API_SERVER_EVENTO + '/getByID/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
  create(data: any): Observable<DtoEvento> {
    return this.http.post<DtoEvento>(this.API_SERVER_EVENTO + '/register', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data: any): Observable<DtoEvento> {
    return this.http
      .patch<DtoEvento>(this.API_SERVER_EVENTO + '/update/' + data.id, data)
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
