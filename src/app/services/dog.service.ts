import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Dog } from '../models/Dog';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private resourceUrl = environment.API;

  constructor(private http: HttpClient) {}

  public getDogs(page = 0, limit = 10) {
    return this.http.get<Dog[]>(`${this.resourceUrl}/breeds/`, {
      params: {
        page,
        limit,
      },
      observe: 'response',
    });
  }
}
