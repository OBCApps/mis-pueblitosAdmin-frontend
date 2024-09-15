import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


import { FilterLugar } from '../models/FilterLugar';
import { API_SERVICE_ADMIN } from '../../../../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class LugarSelectorService {
  private API_SERVER_EVENTO = API_SERVICE_ADMIN + 'lugar';

  constructor(private http: HttpClient) { }


  // -------- CRUD ENTIDADES ---------- \\
  /* search(data: FilterEvento): Observable<listFilterEvento[]> {
    return this.http.post<listFilterEvento[]>(this.API_SERVER_EVENTO + '/filter-list', data).pipe(
      map((response) => {
        return response;
      })
    );
  } */
  search(data: FilterLugar): Observable<any[]> {
    return this.http.get<any[]>(this.API_SERVER_EVENTO).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
