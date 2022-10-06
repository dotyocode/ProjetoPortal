import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AulasService } from 'src/app/shared/service/aulas.service';
import { Aulas } from 'src/app/shared/model/aulas';
import { SharedServiceService } from 'src/app/shared/service/shared-service.service';
@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.scss']
})
export class AulasComponent implements OnInit {

  loading: boolean = false;
  formVisible: string = 'adicionar';
  titleComponent: string = '';

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  fileToUpload: any;
  fileToUploadTwo: any;
  professor: any[] = [];
  titles: string = 'Carregando informações'

  curso: Aulas = {}
  professorSelected: any = {};
  size = window.innerWidth;

  idNumber: number = 1;
  aulas: any[] = [];
  aulaSelected: any;
  paramsId: any;

  formGroup: any = this.formBuilder.group({
    id: [null],
    aulaName: [null, [Validators.required]], // email
    descricaoAula: [null, [Validators.required]], // senha
    urlVideo: [''],
  })

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
  }
  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private aulaService: AulasService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute, private sharedService: SharedServiceService,) { }

  ngOnInit(): void {
    this.formVisible = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      this.paramsId = params['id'];
      if (params && this.paramsId) {
        this.aulaService.getCursosId(this.paramsId).subscribe((response) => {
          this.curso = response;
        })
      }

      if (this.formVisible === 'adicionarAula') {
        this.titleComponent = 'Adicionar Aula'
      } else if (this.formVisible === 'editarAula') {
        this.getAulaId(this.paramsId);
        this.titleComponent = 'Editar Aula'
      }
    })

  }

  getAulaId(id: any) {
    this.aulaService.getAulaId(id).subscribe((response) => {
      this.aulas = response;
    })
  }

  selectedCurso(event: any) {
    this.aulaSelected = event
    if (this.aulaSelected !== null) {
      this.setViewCurso(this.aulaSelected)
    } else {
      this.toastr.error('Ops houve um erro', 'Error', {
        timeOut: 600,
      })
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
      titulo: this.formGroup.value.aulaName,
      descricao: this.formGroup.value.descricaoAula,
      urlVideo: this.formGroup.value.urlVideo,
      curso: this.curso,
    }
  }

  stepActionButtons(event: any) {
    switch (event) {
      case 'cadastrarCurso':
        this.addAula();
        break;
      case 'editarCurso':
        this.editAulas();
        break;
    }
    if (event.action === 'deletar') {
      this.deleteItem(event.item.id);
    }
  }

  setViewCurso(response: any) {
    this.formGroup.get('id')?.setValue(response.id);
    this.formGroup.get('aulaName')?.setValue(response.titulo);
    this.formGroup.get('descricaoAula')?.setValue(response.descricao);
    this.formGroup.get('urlVideo')?.setValue(response.urlVideo);
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

  addItem(): void {
    let propriedades: any = {
      id: this.idNumber++,
      titulo: this.formGroup.value.aulaName,
      descricao: this.formGroup.value.descricaoAula,
      urlVideo: this.formGroup.value.urlVideo,
      curso: this.curso
    }
    this.aulas = [...this.aulas, propriedades];
    this.formGroup.reset();
  }

  deleteItem(id: any): void {
    let aulaDeletada: any[] = this.aulas.filter(item => item.id === id);
    let index: any = this.aulas.indexOf(aulaDeletada[0]);
    if (index >= 0) {
      this.aulas.splice(index, 1);
    }
  }

  addAula() {
    this.loading = true
    this.getCursoForm()
    this.aulaService.addAula(this.aulas).subscribe((response) => {
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

  editAulas() {
    this.loading = true
    this.getCursoForm()
    this.aulaService.editAula(this.curso).subscribe((response) => {
      this.loading = false;
      this.formGroup.reset();
      this.getAulaId(this.paramsId);
      if (response) {
        this.toastr.success('Aula Alterada!', 'Sucesso', {
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

}
