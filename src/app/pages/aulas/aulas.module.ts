import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AulasRoutingModule } from './aulas-routing.module';
import { ConteudosComponent } from './conteudos/conteudos.component';
import { AulasComponent } from './aulas.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AulasComponent,
    ConteudosComponent
  ],
  imports: [
    CommonModule,
    AulasRoutingModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    IvyCarouselModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatListModule,
    MatSelectModule
  ]
})
export class AulasModule { }
