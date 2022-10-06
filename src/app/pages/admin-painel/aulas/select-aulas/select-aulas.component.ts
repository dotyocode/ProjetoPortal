import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { SharedServiceService } from 'src/app/shared/service/shared-service.service';

@Component({
  selector: 'app-select-aulas',
  templateUrl: './select-aulas.component.html',
  styleUrls: ['./select-aulas.component.css']
})
export class SelectAulasComponent implements OnInit {

  cursos: any[] = [];
  cursoSelected: any;
  title: string = 'Carregando informações'
  titles: string = 'Carregando informações'

  formGroup: any = this.formBuilder.group({
    cursoName: [null, [Validators.required]], // curso
  })

  constructor(public dialogRef: MatDialogRef<SelectAulasComponent>,
    private cursoService: CursosService, private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllCurso();
  }

  getAllCurso() {
    this.cursoService.getCursos().subscribe((response) => {
      this.cursos = response
      if (this.cursos !== null) {
        this.titles = 'Cursos dispóniveis'
      }
    })
  }

  selectedCurso(event: any) {
    this.cursoSelected = event
    console.log(this.cursoSelected)
    if (this.cursoSelected !== null) {
      this.dialogRef.close();
      this.router.navigate([`/painel-admin/${event.id}/adicionarAula`])
      this.toastr.success('Curso Selecionado', 'Sucesso', {
        timeOut: 600,
      })

    } else {
      this.toastr.error('Ops houve um erro', 'Error', {
        timeOut: 600,
      })
    }
  }

}
