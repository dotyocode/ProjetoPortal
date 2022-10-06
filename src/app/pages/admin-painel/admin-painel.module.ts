import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPainelRoutingModule } from './admin-painel-routing.module';
import { AdicionarComponent } from './curso/adicionar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDynamicModule } from 'src/app/Components/input-dynamic/input-dynamic.module';
import { ButtonDynamicModule } from 'src/app/Components/button-dynamic/button-dynamic.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectCursoComponent } from './curso//select-curso/select-curso.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EditarCursoComponent } from './curso//editar-curso/editar.component';
import { AddCursoComponent } from './curso/add-curso/add-curso.component';
import { ProfessorComponent } from './professor/professor.component';
import { AddProfessorComponent } from './professor/add-professor/add-professor.component';
import { EditProfessorComponent } from './professor/edit-professor/edit-professor.component';
import { SelectProfessorComponent } from './professor/select-professor/select-professor.component';
import { AulasComponent } from './aulas/aulas.component';
import { AddAulasComponent } from './aulas/add-aulas/add-aulas.component';
import { EditAulasComponent } from './aulas/edit-aulas/edit-aulas.component';
import { SelectAulasComponent } from './aulas/select-aulas/select-aulas.component';
import { MatCardModule } from '@angular/material/card';
import { EditSelectAulasComponent } from './aulas/select-aulas/edit-aulas/edit-aulas.component';
import { NoticiasComponentComponent } from './noticias-component/noticias-component.component';
import { AddNoticiasComponent } from './noticias-component/add-noticias/add-noticias.component';
import { EditNoticiasComponent } from './noticias-component/edit-noticias/edit-noticias.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { SelectNoticiaComponent } from './noticias-component/select-noticia/select-noticia.component';
import { FerramentaComponent } from './ferramenta/ferramenta.component';
import { AddFerramentaComponent } from './ferramenta/add-ferramenta/add-ferramenta.component';
import { EditFerramentaComponent } from './ferramenta/edit-ferramenta/edit-ferramenta.component';
import { SelectFerramentaComponent } from './ferramenta/select-ferramenta/select-ferramenta.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AdicionarComponent,
    SelectCursoComponent,
    EditarCursoComponent,
    AddCursoComponent,
    ProfessorComponent,
    AddProfessorComponent,
    EditProfessorComponent,
    SelectProfessorComponent,
    AulasComponent,
    AddAulasComponent,
    EditAulasComponent,
    SelectAulasComponent,
    EditSelectAulasComponent,
    NoticiasComponentComponent,
    AddNoticiasComponent,
    EditNoticiasComponent,
    SelectNoticiaComponent,
    FerramentaComponent,
    AddFerramentaComponent,
    EditFerramentaComponent,
    SelectFerramentaComponent,
  ],
  imports: [
    CommonModule,
    AdminPainelRoutingModule,
    MatProgressSpinnerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    InputDynamicModule,
    ButtonDynamicModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    CKEditorModule
  ]
})
export class AdminPainelModule { }
