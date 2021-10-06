import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtTokenService} from '../auth-services/jwt-token.service';

@Injectable()

export class HttpApiInterceptor implements HttpInterceptor {

  constructor(
    private jwtTokenService: JwtTokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let Headers = {};
    if (!request.headers.has('Content-Type')) {
      Headers = {
        'Content-Type': 'application/json',
      };
    }
    this.jwtTokenService.patchHeaders(request.url, Headers);
    request = request.clone({
      setHeaders: Headers
    });
    return next.handle(request);
  }
}
