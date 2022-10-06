import { Cursos } from '../../../shared/model/cursoDTO';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Professor } from 'src/app/shared/model/professor';
import { ProfessorService } from 'src/app/shared/service/professor.service';
import { Noticias } from 'src/app/shared/model/noticias';
import { NoticiasService } from 'src/app/shared/service/noticias.service';

@Component({
  selector: 'app-noticias-component',
  templateUrl: './noticias-component.component.html',
  styleUrls: ['./noticias-component.component.css']
})
export class NoticiasComponentComponent implements OnInit {

  loading: boolean = false;
  formVisible: string = 'adicionar';
  titleComponent: string = '';


  title = 'File-Upload-Save';
  selectedFiles: FileList;
  fileToUpload: any;
  fileToUploadTwo: any;
  professor: any[] = [];
  titles: string = 'Carregando informações'

  professores: Noticias = {}
  professorSelected: any = {};
  size = window.innerWidth;

  formGroup: any = this.formBuilder.group({
    id: [null],
    tituloNoticias: [null, [Validators.required]], // email
    autor: [null, [Validators.required]], // senha
    textoNoticia: [null],
  })

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
  }
  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private noticiasService: NoticiasService
  ) { }

  ngOnInit(): void {
    this.formVisible = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      if (params && params['id']) {
        this.noticiasService.getNoticiasID(params['id']).subscribe((response) => {
          this.professores = response;
          this.setViewCurso(this.professores)
        })
      }

      if (this.formVisible === 'adicionarNoticias') {
        this.titleComponent = 'Adicionar Notícias'
      } else if (this.formVisible === 'editarNoticias') {
        this.titleComponent = 'Editar Notícias'
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
      titulo: this.formGroup.value.tituloNoticias,
      textoNoticia: this.formGroup.value.textoNoticia,
      autor: this.formGroup.value.autor,
      urlNoticia: '',
      imagemDivulgacao: '',
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
    this.formGroup.get('tituloNoticias')?.setValue(response.titulo);
    this.formGroup.get('textoNoticia')?.setValue(response.textoNoticia);
    this.formGroup.get('autor')?.setValue(response.autor);
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
    this.noticiasService.addNoticias(this.professores, this.fileToUpload).subscribe((response) => {
      this.loading = false;
      if (response) {
        this.toastr.success('Notícia adicionada!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao adicionar uma nova Notícia', 'Erro', {
        timeOut: 600,
      })
    })
  }

  editCurso() {
    this.loading = true
    this.getProfessorForm()
    this.noticiasService.editNoticias(this.professores, this.fileToUpload).subscribe((response) => {
      console.log(response)
      this.loading = false;
      if (response) {
        this.toastr.success('Notícia Alterada!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao editar a notícia', 'Erro', {
        timeOut: 600,
      })
    })
  }

  save(event: any) {

  }

}
