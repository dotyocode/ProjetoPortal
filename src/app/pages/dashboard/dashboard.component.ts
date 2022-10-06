import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { navbarData } from 'src/app/Components/side-menu/side-menu-data';
import { LoginService } from 'src/app/shared/service/login.service';
import { LoginBoxService } from '../login/loginPage/login-box/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() collapsed = true;
  @Input() screenWidth = 0;
  openedOpen: boolean = true;
  openedClose: boolean = false;
  @Input() openMobile: boolean = false;
  @Output() teste = new EventEmitter<boolean>();
  navData = navbarData;
  testesz: boolean = false;
  loading: boolean = false;
  foto: any;
  isMenuOpen: boolean = true;
  contentMargin: number = 240;
  tipoUsuario: string = '';

  nome: string = ''

  testes = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.testes = window.innerWidth;
  }
  constructor(private loginAuth: LoginBoxService, private loginService: LoginService, private router: Router,) {

  }

  ngOnInit(): void {
    this.userLogged();
  }

  openMenu() {
    if (this.openMobile === true) {
      this.openMobile = false;
    } else {
      this.openMobile = true;
    }
  }

  userLogged() {
    this.loginService.getUserLogged().subscribe((response: any) => {
      this.nome = 'Olá ' + response.nome;
      this.foto = response.foto;
      this.tipoUsuario = response.tipoUsuario
    }, error => this.logout())
  }

  logout() {
    this.loginAuth.logout();
    this.loading = true;
  }

  recuar() {
    this.isMenuOpen = !this.isMenuOpen;
    const el: any = document.getElementById('navStorm')
    if (!this.isMenuOpen) {
      this.contentMargin = 70;
      el.style.transition = "all 0.5s"
    } else {
      this.contentMargin = 240;
      el.style.transition = "all 0.5s"
    }
  }

  navigate(item: any) {
    console.log(item)
    this.router.navigate([`${item}`]).then(() => { window.location.reload(); });
  }

  goToAdm() {
    this.router.navigate([`/painel-admin`]).then(() => { window.location.reload(); });
  }

  goToFerramentas() {
    this.router.navigate([`/ferramentas`]).then(() => { window.location.reload(); });
  }

}
