import { HttpInterceptor } from "@angular/common/http/src/interceptor";
import { AuthService } from "./auth.service";
import { HttpHandler } from "@angular/common/http/src/backend";
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpErrorResponse, HttpResponse, HttpRequest } from "@angular/common/http";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService, private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpRequest) {
            console.log("authentifié");
            // do stuff with response if you want
            this.router.navigate(['/missions'])
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            console.log("non authentifié");
            this.router.navigate(['/authentification'])
          }
        }
      });
    }
}
