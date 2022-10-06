import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginBoxService } from '../pages/login/loginPage/login-box/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthloginGuard implements CanActivate {

  constructor(private authService: LoginBoxService, private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const autenticado: any = this.authService.userAuth();
    if (autenticado) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }



}
