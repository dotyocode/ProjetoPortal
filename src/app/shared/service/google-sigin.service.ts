import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSiginService {

  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)
  public check: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id: 'CLIENTE_ID_HERE',
        ux_mode: 'popup',
      })
    })
  }

  public signIn() {
    this.check.emit(true)
    return this.auth2.signIn({
      scope: 'profile email openid',
      prompt: 'select_account',
    })
  }

  valid(teste: any) {
    this.subject.next(teste)
  }

  public signOut() {
    this.auth2.signOut()
      .then((e: any) => {
        this.subject.next(e)
      })
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable()
  }

}


