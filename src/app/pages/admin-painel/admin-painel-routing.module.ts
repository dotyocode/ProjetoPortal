import { AddFerramentaComponent } from './ferramenta/add-ferramenta/add-ferramenta.component';
import { EditAulasComponent } from './aulas/edit-aulas/edit-aulas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCursoComponent } from './curso/add-curso/add-curso.component';
import { AdminPainelComponent } from './admin-painel.component';
import { EditarCursoComponent } from './curso/editar-curso/editar.component';
import { AddProfessorComponent } from './professor/add-professor/add-professor.component';
import { EditProfessorComponent } from './professor/edit-professor/edit-professor.component';
import { AddAulasComponent } from './aulas/add-aulas/add-aulas.component';
import { AddNoticiasComponent } from './noticias-component/add-noticias/add-noticias.component';
import { EditNoticiasComponent } from './noticias-component/edit-noticias/edit-noticias.component';
import { EditFerramentaComponent } from './ferramenta/edit-ferramenta/edit-ferramenta.component';

const routes: Routes = [
  {
    path: 'painel-admin',
    component: AdminPainelComponent,
  },
  {
    path: 'painel-admin/:id/editarCurso',
    component: EditarCursoComponent,
  },
  {
    path: 'painel-admin/adicionarCurso',
    component: AddCursoComponent,
  },
  {
    path: 'painel-admin/adicionarProfessor',
    component: AddProfessorComponent,
  },
  {
    path: 'painel-admin/:id/editarProfessor',
    component: EditProfessorComponent,
  },
  {
    path: 'painel-admin/:id/adicionarAula',
    component: AddAulasComponent,
  },
  {
    path: 'painel-admin/:id/editarAula',
    component: EditAulasComponent,
  },
  {
    path: 'painel-admin/adicionarNoticias',
    component: AddNoticiasComponent,
  },
  {
    path: 'painel-admin/:id/editarNoticias',
    component: EditNoticiasComponent,
  },
  {
    path: 'painel-admin/adicionarFerramentas',
    component: AddFerramentaComponent,
  },
  {
    path: 'painel-admin/:id/editarFerramentas',
    component: EditFerramentaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPainelRoutingModule { }
