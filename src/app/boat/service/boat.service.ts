import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boat } from '../model/boat.model';
import { BoatPaged } from '../model/paged-boat.model';

@Injectable()
export class BoatService {

  constructor(private httpClient: HttpClient) { }

  getBoats(page: number = 0, size: number = 10): Observable<BoatPaged> {
    return this.httpClient.get<any>(`/api/v1/boats?page=${page}&size=${size}`);
  }

  postBoats(boat: Boat): Observable<Boat> {
    return this.httpClient.post<Boat>('/api/v1/boats', boat);
  }

  putBoats(boat: Boat): Observable<Boat> {
    return this.httpClient.put<Boat>(`/api/v1/boats/${boat.id}`, boat);
  }

  deleteBoats(boatId: number): Observable<Boat> {
    return this.httpClient.delete<Boat>(`/api/v1/boats/${boatId}`);
  }
}
