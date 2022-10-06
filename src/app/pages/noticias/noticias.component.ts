import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { NoticiasService } from 'src/app/shared/service/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  sizes = window.innerWidth;
  professores: any = {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sizes = window.innerWidth;
  }

  private ngUnsubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(private noticiasService: NoticiasService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      if (params && params['id']) {
        this.noticiasService.getNoticiasID(params['id']).subscribe((response) => {
          this.professores = response;
          console.log(this.professores)
        })
      }
    })
  }


}
