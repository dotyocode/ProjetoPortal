import { Professor } from '../../../shared/model/professor';
import { Cursos } from '../../../shared/model/cursoDTO';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})
export class AdicionarComponent implements OnInit {

  loading: boolean = false;
  formVisible: string = 'adicionar';
  titleComponent: string = '';

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  fileToUpload: any;
  fileToUploadTwo: any;
  professor: any[] = [];
  titles: string = 'Carregando informações'

  curso: any = {}
  professorSelected: any = {};
  size = window.innerWidth;

  formGroup: any = this.formBuilder.group({
    id: [null],
    cursoName: [null, [Validators.required]], // email
    descricaoCurso: [null, [Validators.required]], // senha
    imagemCapa: [''],
    imagemDivulgacao: [''],
    professorName: [null, [Validators.required]],
  })

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
  }
  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private cursoSevice: CursosService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formVisible = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      if (params && params['id']) {
        this.cursoSevice.getCursosId(params['id']).subscribe((response) => {
          this.curso = response;
          this.setViewCurso(this.curso)


        })
      }

      if (this.formVisible === 'adicionarCurso') {
        this.titleComponent = 'Adicionar Curso'
      } else if (this.formVisible === 'editarCurso') {
        this.titleComponent = 'Editar Curso'
      } else if (this.formVisible === 'adicionarProfessor') {
        this.titleComponent = 'Adicionar Professor'
      } else if (this.formVisible === 'editarProfessor') {
        this.titleComponent = 'Editar Professor'
      }
    })
    this.getProfessor()
  }

  checkProfessor(id: any) {
    if (this.professor !== null) {
      this.professorSelected = id.professor
      this.formGroup.controls['professorName'].setValue(this.professorSelected)
      console.log(this.formGroup.value.professorName)
    }
  }

  getCursoForm(): void {
    Object.keys(this.formGroup.value).forEach((key: any) => {
      if (this.formGroup.value[key] === '') {
        this.formGroup.value[key] = null;
      }
    })

    this.curso = {
      id: this.formGroup.value.id,
      nome: this.formGroup.value.cursoName,
      descricao: this.formGroup.value.descricaoCurso,
      imagemDivulgacao: '',
      imagemCapa: '',
      professor: this.formGroup.value.professorName,
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
    this.formGroup.get('cursoName')?.setValue(response.nome);
    this.formGroup.get('descricaoCurso')?.setValue(response.descricao);
    this.formGroup.get('professorName')?.setValue(response.professor);
    this.checkProfessor(response)
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

  selectFileTwo(event: any) {
    this.fileToUploadTwo = <File>event.target.files[0];
  }

  addCurso() {
    this.loading = true
    this.getCursoForm()
    this.cursoSevice.addCurso(this.curso, this.fileToUpload, this.fileToUploadTwo).subscribe((response) => {
      this.loading = false;
      if (response) {
        this.toastr.success('Curso adicionado!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao adicionar um novo curso', 'Erro', {
        timeOut: 600,
      })
    })
  }

  editCurso() {
    this.loading = true
    this.getCursoForm()
    this.cursoSevice.editCurso(this.curso, this.fileToUpload ? this.fileToUpload : this.curso.imagemDivulgacao, this.fileToUploadTwo ? this.fileToUploadTwo : this.curso.imagemCapa, '', '').subscribe((response) => {
      console.log(response)
      this.loading = false;
      if (response) {
        this.toastr.success('Curso Alterado!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao adicionar um novo curso', 'Erro', {
        timeOut: 600,
      })
    })
  }

  getProfessor() {
    this.cursoSevice.getProfessor().subscribe((response) => {
      this.professor = response;
      if (this.professor !== null) {
        this.titles = 'Selecione o professor.'
      }
    })
  }

  slectedProfessor(event: any) {
    this.professorSelected = event
    console.log(this.professorSelected)
    if (this.professorSelected !== null) {
      this.toastr.info('Curso Selecionado', 'Informação', {
        timeOut: 600,
      })
    }
  }
}
