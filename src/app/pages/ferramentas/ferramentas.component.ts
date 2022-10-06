import { Component, OnInit } from '@angular/core';
import { FerramentasService } from 'src/app/shared/service/ferramentas.service';

@Component({
  selector: 'app-ferramentas',
  templateUrl: './ferramentas.component.html',
  styleUrls: ['./ferramentas.component.css']
})
export class FerramentasComponent implements OnInit {

  itens: boolean = false;
  sizes = window.innerWidth;
  ferramentas: any;

  constructor(private ferramentasService: FerramentasService) { }

  ngOnInit(): void {
    this.getAllFerramentas()
  }

  getAllFerramentas() {
    this.ferramentasService.getCursos().subscribe(response => {
      this.itens = true
      this.ferramentas = response
    })

  }

}
