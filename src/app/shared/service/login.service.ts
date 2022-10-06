import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private path: any;
  private pathLogin: any = '';
  private pathLoginProvider: any = '';
  private pathUserLogged: any = '';
  private register: any = '';
  private remember: any = '';
  private now: any = '';

  constructor(private http: HttpClient) {
    this.path = environment.API_URL;
    this.pathLogin = `${this.path}/login`
    this.pathLoginProvider = `${this.path}/login/provider`
    this.pathUserLogged = `${this.path}/usuario`
    this.register = `${this.path}/usuarios/cadastro`
    this.remember = `${this.path}/login/recuperar-senha`
    this.now = `${this.path}/login/nova-senha`
  }

  getLogin(): Observable<any> {
    return this.http.get<any>(this.pathLogin);
  }

  postLogin(username: any, senha: any): Observable<any> {
    const body = {
      username,
      senha
    }
    return this.http.post<any>(`${this.pathLogin}`, body);
  }

  postRemember(email: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', email)


    return this.http.post<any>(`${this.remember}`, email, { params: params })
  }


  rememberNow(remember: any): Observable<any> {
    return this.http.post<any>(`${this.now}`, remember)
  }

  postLoginProvider(email: any, nomeCompleto: any, urlFoto: any, authToken: any, provider: any): Observable<any> {
    const body = {
      email,
      nomeCompleto,
      urlFoto,
      authToken,
      provider
    }
    return this.http.post<any>(`${this.pathLoginProvider}`, body);
  }

  getUserLogged(): Observable<any> {
    let auth: any = localStorage.getItem("token");
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8;',
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth}`,
      })
    }
    return this.http.get<any>(this.pathUserLogged, HttpUploadOptions);
  }

  registerUser(usuarioDTO: any): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(usuarioDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('usuarioDTO', blob);
    // formdata.append('fotoPerfil', fotoPerfil);

    return this.http.post<any>(`${this.register}`, formdata);
  }

}
