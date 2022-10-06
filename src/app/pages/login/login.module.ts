import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './loginPage/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDynamicModule } from 'src/app/Components/input-dynamic/input-dynamic.module';
import { LoginBoxComponent } from './loginPage/login-box/login-box.component';
import { ButtonDynamicModule } from 'src/app/Components/button-dynamic/button-dynamic.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardModule } from '../dashboard/dashboard.module';
@NgModule({
  declarations: [LoginComponent, LoginBoxComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    InputDynamicModule,
    ButtonDynamicModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatProgressBarModule,
    DashboardModule
  ],
})
export class LoginModule { }
