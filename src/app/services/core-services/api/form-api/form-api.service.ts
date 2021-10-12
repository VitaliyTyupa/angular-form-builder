import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MainApiService} from '../main-api.service';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  baseUrl = this.mainApiService.getBaseUrl();

  constructor(
    private http: HttpClient,
    private mainApiService: MainApiService,
  ) { }

  saveForm(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/custom_forms`, body);
  }

  updateForm(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}/custom_forms/${id}`, body);
  }

  deleteForm(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/custom_forms/${id}`);
  }
}
