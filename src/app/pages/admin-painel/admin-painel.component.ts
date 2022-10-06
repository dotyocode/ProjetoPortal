import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';
import { AdicionarComponent } from './curso/adicionar.component';
import { SelectCursoComponent } from './curso//select-curso/select-curso.component';
import { SelectProfessorComponent } from './professor/select-professor/select-professor.component';
import { SelectAulasComponent } from './aulas/select-aulas/select-aulas.component';
import { EditSelectAulasComponent } from './aulas/select-aulas/edit-aulas/edit-aulas.component';
import { SelectNoticiaComponent } from './noticias-component/select-noticia/select-noticia.component';
import { SelectFerramentaComponent } from './ferramenta/select-ferramenta/select-ferramenta.component';

@Component({
  selector: 'app-admin-painel',
  templateUrl: './admin-painel.component.html',
  styleUrls: ['./admin-painel.component.scss']
})
export class AdminPainelComponent implements OnInit {

  saudacaoConst: any;
  nome: string = ''

  constructor(private loginService: LoginService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.saudacao();
    this.userLogged();
  }

  saudacao() {
    this.saudacaoConst = new Date().getHours();
    switch (true) {
      case this.saudacaoConst <= 5: return this.saudacaoConst = 'Boa madrugada';
      case this.saudacaoConst < 12: return this.saudacaoConst = 'Bom dia';
      case this.saudacaoConst < 18: return this.saudacaoConst = 'Boa tarde';
      default: return this.saudacaoConst = 'Boa noite';
    }
  }

  userLogged() {
    this.loginService.getUserLogged().subscribe((response: any) => {
      this.nome = response.nome;
    })
  }

  createCurso() {
    this.router.navigate(['/painel-admin/adicionarCurso']).then(() => { window.location.reload(); });
  }

  createProfessor() {
    this.router.navigate(['/painel-admin/adicionarProfessor']).then(() => { window.location.reload(); });
  }

  createNoticias() {
    this.router.navigate(['/painel-admin/adicionarNoticias']).then(() => { window.location.reload(); });
  }

  alterarCurso(): void {
    const dialogRef = this.dialog.open(SelectCursoComponent, {
      width: '650px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  alterarProfessor(): void {
    const dialogRef = this.dialog.open(SelectProfessorComponent, {
      width: '650px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  adicionarAula(): void {
    const dialogRef = this.dialog.open(SelectAulasComponent, {
      width: '650px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  editarAula(): void {
    const dialogRef = this.dialog.open(EditSelectAulasComponent, {
      width: '650px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  editarNoticia(): void {
    const dialogRef = this.dialog.open(SelectNoticiaComponent, {
      width: '650px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  editarFerramentas(): void {
    const dialogRef = this.dialog.open(SelectFerramentaComponent, {
      width: '650px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  addFerramentas() {
    this.router.navigate(['/painel-admin/adicionarFerramentas']).then(() => { window.location.reload(); });
  }

}
