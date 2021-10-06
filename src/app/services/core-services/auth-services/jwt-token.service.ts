import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

export enum Token {
  name = 'boostr-web-token',
}

@Injectable({
  providedIn: 'root'
})

export class JwtTokenService {

  constructor() {
  }

  set token(token: string) {
    localStorage.setItem(Token.name, token);
  }

  get token(): string {
    return localStorage.getItem(Token.name);
  }

  hasToken(): boolean {
    return !!this.token && this.isTokenAvailable(this.token);
  }

  removeToken(): void {
    localStorage.removeItem(Token.name);
  }

  patchHeaders(url: string, headers: {[key: string]: string}): void {
    if (this.isTokenAvailable(this.token)) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
  }

  isTokenAvailable(token): boolean {
    try {
      const { exp } = jwt_decode<{exp: number, refresh: string, sub: number}>(token);
      const currentTime = new Date().getTime() / 1000;
      return exp > currentTime;
    } catch {
      return false;
    }
  }
}
