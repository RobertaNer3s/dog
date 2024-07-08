import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private resourceUrl = environment.API;

  constructor(private http: HttpClient) {}

  public getDogs(page = 0, limit = 10): Observable<any> {
    return this.http.get(`${this.resourceUrl}/breeds`, {
      params: {
        page,
        limit
      }
     });
  }

  public getImageDog(idDog: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/images/search?breed_id=${idDog}`);
  }
}
