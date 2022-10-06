import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { ProfessorService } from 'src/app/shared/service/professor.service';
import { SharedServiceService } from 'src/app/shared/service/shared-service.service';

@Component({
  selector: 'app-select-professor',
  templateUrl: './select-professor.component.html',
  styleUrls: ['./select-professor.component.css']
})
export class SelectProfessorComponent implements OnInit {

  professor: any[] = [];
  professorSelected: any;
  title: string = 'Carregando informações'
  titles: string = 'Carregando informações'

  formGroup: any = this.formBuilder.group({
    cursoName: [null, [Validators.required]], // curso
  })

  constructor(public dialogRef: MatDialogRef<SelectProfessorComponent>,
    private professorService: ProfessorService, private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllCurso();
  }

  getAllCurso() {
    this.professorService.getCursos().subscribe((response) => {
      this.professor = response
      if (this.professor !== null) {
        this.titles = 'Professores dispóniveis'
      }
    })
  }

  selectedProfessor(event: any) {
    this.professorSelected = event
    console.log(this.professorSelected)
    if (this.professorSelected !== null) {
      this.dialogRef.close();
      this.router.navigate([`/painel-admin/${event.id}/editarProfessor`])
      this.toastr.success('Professor Selecionado', 'Sucesso', {
        timeOut: 600,
      })

    } else {
      this.toastr.error('Ops houve um erro', 'Error', {
        timeOut: 600,
      })
    }
  }

}
