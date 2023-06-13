import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import * as utiles from "src/assets/js/test";

import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( tap((data) => {
        if (data instanceof HttpResponse) {
            if(data.body.status === 1 ){
                utiles.hideModel();
            }
          }
    },
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        let token = localStorage.getItem("token");
        if(token !== null ){
          localStorage.clear();
          this.router.navigate(['login']);
        }
      }
    }));
  }
}