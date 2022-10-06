import { AuthloginGuard } from 'src/app/guards/authlogin.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './shared/service/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from './shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { AdminPainelComponent } from './pages/admin-painel/admin-painel.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FerramentasComponent } from './pages/ferramentas/ferramentas.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    AdminPainelComponent,
    FerramentasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
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
    MatListModule,
    CKEditorModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1004875206898979'),
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, AuthloginGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
