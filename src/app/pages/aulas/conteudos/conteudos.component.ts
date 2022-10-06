import { Component, HostListener, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntil, Subject, Subscription } from 'rxjs';
import { AulasService } from 'src/app/shared/service/aulas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conteudos',
  templateUrl: './conteudos.component.html',
  styleUrls: ['./conteudos.component.css']
})


export class ConteudosComponent implements OnInit {

  aula: any[] = [];
  size: any = window.innerWidth;
  sizes: any = window.innerHeight;
  url: any;
  trust: any;
  selected: any[] = [];
  descricao: string = '';
  titulo: string = '';
  mostrar: boolean = false;
  professor: any;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
    this.sizes = window.innerHeight;
  }
  constructor(private activateRouter: ActivatedRoute,
    private router: Router,
    private aulasService: AulasService, private sanitizer: DomSanitizer,
    private toastr: ToastrService,) {

  }

  ngOnInit(): void {
    this.activateRouter.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      if (params && params['id']) {
        this.getAulaIds(params['id'])
      }
    })
  }

  getAulaIds(id: any) {
    this.aulasService.getAulaId(id).subscribe((response: any) => {
      this.aula = response;
      console.log(response)
      if (this.aula.length > 0) {
        this.mostrar = true
        console.log(this.mostrar)
      } else {
        this.mostrar = false
        console.log(this.mostrar)
        this.toastr.error('Não foi possivel encontrar nenhum curso', 'Error', {
          timeOut: 2000,
        })
        this.router.navigate(['/curso/' + id + '/sobre'])
      }

      this.url = this.aula[0]?.urlVideo
      this.selected = this.aula[0]
      this.selecionarAula(this.selected)
    }, error => {
      console.error(error)
    })
  }

  selecionarAula(id: any) {
    this.url = id?.urlVideo;
    this.descricao = id?.descricao;
    this.titulo = id?.titulo
    this.professor = id.curso.professor.nome
  }


  goToDashboard() {
    this.router.navigate(['/dashboard']).then(() => { window.location.reload(); });
  }

}
