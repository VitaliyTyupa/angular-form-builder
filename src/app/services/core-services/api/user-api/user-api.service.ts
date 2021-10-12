import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtTokenService} from '../../auth-services/jwt-token.service';
import {map} from 'rxjs/operators';
import {MainApiService} from '../main-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  baseUrl = this.mainApiService.getBaseUrl();

  constructor(
    private http: HttpClient,
    private jwtTokenService: JwtTokenService,
    private mainApiService: MainApiService,
  ) { }

  signedInUser(): any {
    return this.http.get(`${this.baseUrl}/users/signed_in_user`);
  }

  signIn(credentials): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/sign_in`, credentials).pipe(
      map((user: any) => {
        if (user && user.jwt) {
          this.jwtTokenService.token = user.jwt;
          return user;
        } else {
          throw new Error('You need to sign in before continuing.');
        }
      })
    );
  }
}
