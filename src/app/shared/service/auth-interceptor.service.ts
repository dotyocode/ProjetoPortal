import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBoxService } from 'src/app/pages/login/loginPage/login-box/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginAuth: LoginBoxService,) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let auth: any = localStorage.getItem("token");
    let mostrarMenu: boolean = false;

    if (auth !== null) {
      req = req.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${auth}`,
        },
      });

      this.loginAuth.mostrarMenuEmmiter.subscribe(response => {
        mostrarMenu = response;
      })

    } else {
      mostrarMenu = false;
    }

    return next.handle(req);
  }
}
