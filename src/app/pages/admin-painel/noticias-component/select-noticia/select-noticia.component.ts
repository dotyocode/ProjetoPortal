import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { NoticiasService } from 'src/app/shared/service/noticias.service';
import { ProfessorService } from 'src/app/shared/service/professor.service';
import { SharedServiceService } from 'src/app/shared/service/shared-service.service';

@Component({
  selector: 'app-select-noticia',
  templateUrl: './select-noticia.component.html',
  styleUrls: ['./select-noticia.component.css']
})
export class SelectNoticiaComponent implements OnInit {

  noticias: any[] = [];
  noticiasSelected: any;
  title: string = 'Carregando informações'
  titles: string = 'Carregando informações'

  formGroup: any = this.formBuilder.group({
    cursoName: [null, [Validators.required]], // curso
  })

  constructor(
    public dialogRef: MatDialogRef<SelectNoticiaComponent>,
    private noticiasService: NoticiasService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllNoticias();
  }

  getAllNoticias() {
    this.noticiasService.getNoticia().subscribe((response) => {
      this.noticias = response
      console.log(this.noticias)
      if (this.noticias !== null) {
        this.titles = 'Notícias dispóniveis'
      }
    })
  }

  selectedProfessor(event: any) {
    this.noticiasSelected = event
    console.log(this.noticiasSelected)
    if (this.noticiasSelected !== null) {
      this.dialogRef.close();
      this.router.navigate([`/painel-admin/${event.id}/editarNoticias`])
      this.toastr.success('Notícia Selecionada', 'Sucesso', {
        timeOut: 600,
      })

    } else {
      this.toastr.error('Ops houve um erro', 'Error', {
        timeOut: 600,
      })
    }
  }

}
