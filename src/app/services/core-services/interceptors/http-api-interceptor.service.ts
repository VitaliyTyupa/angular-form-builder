import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtTokenService} from '../auth-services/jwt-token.service';

@Injectable()

export class HttpApiInterceptor implements HttpInterceptor {

  constructor(
    private jwtTokenService: JwtTokenService,
    private tokenExtractor: HttpXsrfTokenExtractor,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    const token = this.tokenExtractor.getToken();
    let Headers = {};
    if (!request.headers.has('Content-Type')) {
      Headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.boostr.v2',
        'Access-Control-Allow-Headers': 'Content-Type'
      };
    }
    if (token) Headers['XSRF-TOKEN'] = token;
    this.jwtTokenService.patchHeaders(request.url, Headers);
    request = request.clone({
      setHeaders: Headers
    });
    return next.handle(request);
  }
}
