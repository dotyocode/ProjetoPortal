import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { LoginBoxService } from '../login/loginPage/login-box/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NoticiasService } from 'src/app/shared/service/noticias.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  mostrarMenu: boolean = false;
  loading: boolean = false;
  buttonName: string = 'Logout';

  cursos: any[] = [];
  noticias: any[] = [];
  itens: boolean = false;
  sizes = window.innerWidth;

  public movies: Array<any> = [];
  public destaques: Array<any> = [];
  public alta: Array<any> = [];
  public tamanho: number;
  public id: any;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sizes = window.innerWidth;
  }

  constructor(
    private loginAuth: LoginBoxService,
    private cursosService: CursosService,
    private noticiasService: NoticiasService,
    private _sanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tamanho = 0;
    this.getCurso();
    this.getNoticias();
  }

  logout() {
    this.loginAuth.logout();
    this.loading = true;
    this.buttonName = 'Deslogando...'
  }

  getCurso() {
    this.cursosService.getCursos().subscribe((response: any) => {
      this.cursos = response;
      console.log(response)
      this.cursos.splice(0, 1);
      if (!this.cursos) {
        this.itens = false;
      } else {
        this.itens = true;
      }
    }, error => console.error(error))
  }

  getNoticias() {
    this.noticiasService.getNoticia().subscribe((response: any) => {
      this.noticias = response;
      if (!this.noticias) {
        this.itens = false;
      } else {
        this.itens = true;
      }
    }, error => console.error(error))
  }

  verNoticias(id: any) {
    this.router.navigate(['/noticias/' + id]).then(() => { window.location.reload(); });
  }

  getCursoId(id: any) {
    this.router.navigate(['/curso/' + id + '/sobre']).then(() => { window.location.reload(); });
  }

}
