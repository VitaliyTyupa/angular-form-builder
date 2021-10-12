import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  constructor() { }

  getBaseUrl(): string {
    return '/api';
  }
}
