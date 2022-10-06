import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AulasService } from 'src/app/shared/service/aulas.service';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { SharedServiceService } from 'src/app/shared/service/shared-service.service';

@Component({
  selector: 'app-edit-select-aulas',
  templateUrl: './edit-aulas.component.html',
  styleUrls: ['./edit-aulas.component.css']
})
export class EditSelectAulasComponent implements OnInit {

  cursos: any[] = [];
  cursoSelected: any;
  aulaSelected: any;
  title: string = 'Carregando informações'
  titles: string = 'Carregando informações'
  titlesAula: string = 'Carregando informações'
  aulasdisponiveis: any[] = [];
  inputAula: boolean = false;

  formGroup: any = this.formBuilder.group({
    cursoName: [null, [Validators.required]], // curso
  })

  constructor(public dialogRef: MatDialogRef<EditSelectAulasComponent>,
    private cursoService: CursosService, private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedServiceService, private formBuilder: FormBuilder,
    private aulasService: AulasService) { }

  ngOnInit(): void {
    this.getAllCurso();
  }

  getAllCurso() {
    this.cursoService.getCursos().subscribe((response) => {
      this.cursos = response
      if (this.cursos !== null) {
        this.titles = 'Selecione o curso'
      }
    })
  }

  selectedCurso(event: any) {
    this.cursoSelected = event
    if (this.cursoSelected !== null) {
      this.inputAula = true;
      this.dialogRef.close();
      this.router.navigate([`/painel-admin/${event.id}/editarAula`])

      this.aulasService.getAulaId(this.cursoSelected.id).subscribe((response) => {
        this.aulasdisponiveis = response;
        this.titlesAula = 'selecione a Aula'
      })

      this.toastr.success('Aula Selecionada', 'Sucesso', {
        timeOut: 600,
      })

    } else {
      this.toastr.error('Ops houve um erro', 'Error', {
        timeOut: 600,
      })
    }
  }

  // selectedAula(event: any) {
  //   this.aulaSelected = event
  //   if (this.aulaSelected !== null) {

  //     this.router.navigate([`/painel-admin/${event.id}/editarAula`])
  //     this.sharedService.emitChange(this.aulaSelected)
  //     this.toastr.success('Aula Selecionada', 'Sucesso', {
  //       timeOut: 600,
  //     })
  //   } else {
  //     this.toastr.error('Ops houve um erro', 'Error', {
  //       timeOut: 600,
  //     })
  //   }
  // }

}
