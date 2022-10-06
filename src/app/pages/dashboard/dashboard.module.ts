import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from '../principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoticiasComponent } from '../noticias/noticias.component';
import { AulasModule } from '../aulas/aulas.module';
import { MatListModule } from '@angular/material/list';
import { AdminPainelModule } from '../admin-painel/admin-painel.module';

@NgModule({
  declarations: [
    PrincipalComponent,
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    IvyCarouselModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AulasModule,
    MatListModule,
    AdminPainelModule,

  ],
  exports: []
})
export class DashboardModule { }
