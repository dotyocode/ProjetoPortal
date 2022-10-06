import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AulasComponent } from './aulas.component';
import { ConteudosComponent } from './conteudos/conteudos.component';

const routes: Routes = [
  {
    path: 'curso/:id/sobre',
    component: AulasComponent,
  },
  {
    path: 'curso/:id/aulas',
    component: ConteudosComponent,
    children: [
      {
        path: 'teste/:id', component: ConteudosComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulasRoutingModule { }
