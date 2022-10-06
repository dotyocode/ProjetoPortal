import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { FerramentasService } from 'src/app/shared/service/ferramentas.service';
import { SharedServiceService } from 'src/app/shared/service/shared-service.service';

@Component({
  selector: 'app-select-ferramenta',
  templateUrl: './select-ferramenta.component.html',
  styleUrls: ['./select-ferramenta.component.css']
})
export class SelectFerramentaComponent implements OnInit {

  cursos: any[] = [];
  cursoSelected: any;
  title: string = 'Carregando informações'
  titles: string = 'Carregando informações'

  formGroup: any = this.formBuilder.group({
    cursoName: [null, [Validators.required]], // curso
  })

  constructor(public dialogRef: MatDialogRef<SelectFerramentaComponent>,
    private cursoService: FerramentasService, private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllCurso();
  }

  getAllCurso() {
    this.cursoService.getCursos().subscribe((response) => {
      this.cursos = response
      if (this.cursos !== null) {
        this.titles = 'Ferramentas dispóniveis'
      }
    })
  }

  selectedCurso(event: any) {
    this.cursoSelected = event
    console.log(this.cursoSelected)
    if (this.cursoSelected !== null) {
      this.dialogRef.close();
      this.router.navigate([`/painel-admin/${event.id}/editarFerramentas`])
      this.toastr.success('Ferramenta Selecionada', 'Sucesso', {
        timeOut: 600,
      })

    } else {
      this.toastr.error('Ops houve um erro', 'Error', {
        timeOut: 600,
      })
    }
  }

}
