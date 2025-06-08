import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVICE_ADMIN } from '../../../../../environments/environment.prod';

import { FilterEvento } from '../models/FilterEvento';
import { FilterSubEvento } from '../models/FilterSubEvento';
import { DtoSubEvento, DtoSubEventoDetalle } from '../models/DtoSubEvento';
import { FilterSubEventoDetalle } from '../models/FilterSubEventoDetalle';



@Injectable({
  providedIn: 'root',
})
export class SubEventoDetalleService {
  private API_SERVER_EVENTO = API_SERVICE_ADMIN + 'sub-evento-detalle';

  constructor(private http: HttpClient) { }

  // -------- LISTADO DE ENTIDADES ---------- \\
  get_listado_eventos(): Observable<DtoSubEventoDetalle[]> {
    return this.http.get<DtoSubEventoDetalle[]>(this.API_SERVER_EVENTO).pipe(
      map((response) => {
        return response;
      })
    );
  }

  search(data: FilterSubEventoDetalle): Observable<any> {
    return this.http.post<any>(this.API_SERVER_EVENTO + '/filter_pagination', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // -------- CRUD ENTIDADES ---------- \\
  getEventoByID(id: any): Observable<DtoSubEventoDetalle> {
    return this.http.get<DtoSubEventoDetalle>(this.API_SERVER_EVENTO + '/getByID/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
  create(data: any): Observable<DtoSubEventoDetalle> {
    return this.http.post<DtoSubEventoDetalle>(this.API_SERVER_EVENTO + '/create', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data: any): Observable<DtoSubEventoDetalle> {
    return this.http
      .patch<DtoSubEventoDetalle>(this.API_SERVER_EVENTO + '/update/' + data.id, data)
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
