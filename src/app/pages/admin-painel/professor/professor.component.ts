import { Cursos } from '../../../shared/model/cursoDTO';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Professor } from 'src/app/shared/model/professor';
import { ProfessorService } from 'src/app/shared/service/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  loading: boolean = false;
  formVisible: string = 'adicionar';
  titleComponent: string = '';

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  fileToUpload: any;
  fileToUploadTwo: any;
  professor: any[] = [];
  titles: string = 'Carregando informações'

  professores: Professor = {}
  professorSelected: any = {};
  size = window.innerWidth;

  formGroup: any = this.formBuilder.group({
    id: [null],
    nameProfessor: [null, [Validators.required]], // email
    emailProfessor: [null, [Validators.required, Validators.email]], // senha
    fotoProfessor: [''],
    telefone: [null, [Validators.required]],
  })

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
  }
  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private professorService: ProfessorService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formVisible = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      if (params && params['id']) {
        this.professorService.getCursosId(params['id']).subscribe((response) => {
          this.professores = response;
          this.setViewCurso(this.professores)
        })
      }

      if (this.formVisible === 'adicionarProfessor') {
        this.titleComponent = 'Adicionar Professor'
      } else if (this.formVisible === 'editarProfessor') {
        this.titleComponent = 'Editar Professor'
      }
    })
  }

  checkProfessor(id: any) {
    if (this.professor !== null) {
      this.professorSelected = id.professor
      this.formGroup.controls['professorName'].setValue(this.professorSelected)
      console.log(this.formGroup.value.professorName)
    }
  }

  getProfessorForm(): void {
    Object.keys(this.formGroup.value).forEach((key: any) => {
      if (this.formGroup.value[key] === '') {
        this.formGroup.value[key] = null;
      }
    })

    this.professores = {
      id: this.formGroup.value.id,
      nome: this.formGroup.value.nameProfessor,
      email: this.formGroup.value.emailProfessor,
      telefone: this.formGroup.value.telefone,
      foto: '',
    }
  }

  stepActionButtons(button: any) {
    switch (button) {
      case 'cadastrarCurso':
        this.addCurso();
        break;
      case 'editarCurso':
        this.editCurso();
    }
  }

  setViewCurso(response: any) {
    this.formGroup.get('id')?.setValue(response.id);
    this.formGroup.get('nameProfessor')?.setValue(response.nome);
    this.formGroup.get('emailProfessor')?.setValue(response.email);
    this.formGroup.get('telefone')?.setValue(response.telefone);
  }

  validTouch(field: string) {
    if (!this.formGroup || this.formGroup.get(field)) {
      return false
    }
    return !this.formGroup.get(field).valid && this.formGroup.get(field).touched;
  }

  goToAdmin() {
    this.router.navigate(['/painel-admin'])
  }

  selectFile(event: any) {
    this.fileToUpload = <File>event.target.files[0];
  }

  addCurso() {
    this.loading = true
    this.getProfessorForm()
    this.professorService.addProfessor(this.professores, this.fileToUpload).subscribe((response) => {
      this.loading = false;
      if (response) {
        this.toastr.success('Professor adicionado!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao adicionar um novo professor', 'Erro', {
        timeOut: 600,
      })
    })
  }

  editCurso() {
    this.loading = true
    this.getProfessorForm()
    this.professorService.editProfessor(this.professores, this.fileToUpload).subscribe((response) => {
      console.log(response)
      this.loading = false;
      if (response) {
        this.toastr.success('Professor Alterado!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao adicionar um novo professor', 'Erro', {
        timeOut: 600,
      })
    })
  }

}
