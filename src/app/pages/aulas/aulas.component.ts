import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CursosService } from 'src/app/shared/service/cursos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.scss']
})
export class AulasComponent implements OnInit {

  curso: any;
  image: any;
  size: any = window.innerWidth;
  ids: any;

  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = window.innerWidth;
  }
  constructor(private cursosService: CursosService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activateRouter.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      this.ids = params['id']
      if (params && params['id']) {
        this.getCursoId(params['id'])
      }
    })
  }


  getCursoId(id: any) {
    this.cursosService.getCursosId(id).subscribe((response: any) => {
      this.curso = response;
      console.log(this.curso)
      this.image = this.curso.imagemCapa
    }, error => {
      console.error(error)
    })
  }

  goToClass(id: any) {
    id = this.ids
    this.router.navigate(['/curso/' + id + '/aulas']).then(() => { window.location.reload(); });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']).then(() => { window.location.reload(); });
  }

}
