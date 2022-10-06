import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FerramentasService } from 'src/app/shared/service/ferramentas.service';

@Component({
  selector: 'app-ferramenta',
  templateUrl: './ferramenta.component.html',
  styleUrls: ['./ferramenta.component.css']
})
export class FerramentaComponent implements OnInit {

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
    cursoName: [null, [Validators.required]], //
    descricao: [null, [Validators.required]], //
    arquivo: [null],
    foto: [null]
  })

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
  }
  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private cursoSevice: FerramentasService, private toastr: ToastrService,
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

      if (this.formVisible === 'adicionarFerramentas') {
        this.titleComponent = 'Adicionar Ferramenta'
      } else if (this.formVisible === 'editarFerramentas') {
        this.titleComponent = 'Editar Ferramenta'
      }
    })
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
      descricao: this.formGroup.value.descricao,
      url: '',
      ultimaAtualizacao: "",
      dataCadastro: ""
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
    this.formGroup.get('descricao')?.setValue(response.descricao);
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
        this.toastr.success('Ferramenta adicionada!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao adicionar uma nova Ferramenta', 'Erro', {
        timeOut: 600,
      })
    })
  }

  editCurso() {
    this.loading = true
    this.getCursoForm()
    this.cursoSevice.editCurso(this.curso, this.fileToUpload, this.fileToUploadTwo).subscribe((response) => {
      console.log(response)
      this.loading = false;
      if (response) {
        this.toastr.success('Ferramenta Alterada!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao editar uma nova Ferramenta', 'Erro', {
        timeOut: 600,
      })
    })
  }





}
