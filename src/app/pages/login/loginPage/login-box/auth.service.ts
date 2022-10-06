import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Location } from '@angular/common';
import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleSiginService } from 'src/app/shared/service/google-sigin.service';
import { LoginService } from 'src/app/shared/service/login.service';


@Injectable({
  providedIn: 'root'
})
export class LoginBoxService {

  public usuarioAutenticado: boolean = false;
  register: boolean = false;
  mostrarMenu: boolean = false;

  user: SocialUser; // user facebook
  isLogin: boolean = false; // veirifcacao de login
  loggedIn!: boolean; // verificacao de login
  users: any//gapi.auth2.GoogleUser; // usuarios vinculados ao google

  @Output() mostrarMenuEmmiter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private authService: SocialAuthService,
    private signInService: GoogleSiginService,
    private zone: NgZone,
    private location: Location
  ) { }


  login(username: any, senha: any): void {
    this.loading.emit(true)
    this.loginService.postLogin(username, senha).subscribe(response => {
      localStorage.setItem("token", response.token)
      this.usuarioAutenticado = true;
      this.mostrarMenuEmmiter.emit(true);
      this.loading.emit(false)
      this.toastr.success('Login realizado com sucesso!', 'Sucesso', {
        timeOut: 600,
      })
      this.router.navigate(['/dashboard'])
    }, err => {
      console.error(err)
      this.usuarioAutenticado = false
      this.mostrarMenuEmmiter.emit(false);
      this.loading.emit(false)
      this.toastr.error('Usuario ou senha invalido!', 'Error', {
        timeOut: 600,
      })
    })
  }

  logout() {
    setTimeout(() => {
      localStorage.removeItem('token');
      this.mostrarMenuEmmiter.emit(false);
      this.toastr.success('Deslogado com sucesso!', 'Sucesso', {
        timeOut: 600,
      })
      this.router.navigate(['/login']);
    }, 2000);
  }

  loginWithFacebook() {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.loginFacebookVerify()
    })
  }

  loginFacebookVerify() {
    this.loading.emit(true)
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user = user) {
        this.isLogin = (user != null);
        this.loginService.postLoginProvider(
          this.user.email, this.user.name, this.user.photoUrl, this.user.authToken, 'FACEBOOK'
        ).subscribe(response => {
          localStorage.setItem('token', response.token);
          this.userAuth();
          this.loading.emit(false)
          {
            this.mostrarMenuEmmiter.emit(true);
            this.toastr.success('Login realizado com sucesso!', 'Sucesso', {
              timeOut: 600,
            })
            this.router.navigate(['/dashboard']);
          }
        }, error => {
          this.loading.emit(false)
          this.mostrarMenuEmmiter.emit(false);
          console.error(error)
        });
      } else {
        this.loading.emit(false)
        this.mostrarMenuEmmiter.emit(false);
      }
    });
  }

  loginWithGoogle() {
    this.signInService.signIn().then((data) => {
      this.signInService.valid(data);
      this.googleLoginVerify();
    })
  }

  googleLoginVerify() {
    this.loading.emit(true)
    this.signInService.observable().subscribe(user => {
      this.users = user
      console.log(this.users)
      if (this.users = user) {
        this.loginService.postLoginProvider(
          this.users.yv.HZ, this.users.yv.kw, this.users.yv.PO, this.users.Cc.access_token, 'GOOGLE'
        ).subscribe(response => {
          localStorage.setItem('token', response.token);
          this.userAuth();
          this.loading.emit(false)
          this.zone.run(() => {
            this.mostrarMenuEmmiter.emit(true);
            this.toastr.success('Login realizado com sucesso!', 'Sucesso', {
              timeOut: 600,
            })
            this.router.navigate(['/dashboard']);
          });
        }, error => {
          this.loading.emit(false)
          this.mostrarMenuEmmiter.emit(false);
          console.error(error)
        });
      } else {
        this.loading.emit(false)
        this.mostrarMenuEmmiter.emit(false);
      }
    })
  }

  userAuth() {
    let auth: any = localStorage.getItem("token");
    if (auth) {
      return true
    } else {
      return false
    }
  }
}
