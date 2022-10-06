import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FerramentasComponent } from '../ferramentas/ferramentas.component';
import { NoticiasComponent } from '../noticias/noticias.component';


const routes: Routes = [
  {
    path: 'noticias/:id',
    component: NoticiasComponent,
  },
  {
    path: 'ferramentas',
    component: FerramentasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
