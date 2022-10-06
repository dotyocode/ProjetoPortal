import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/loginPage/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AuthloginGuard } from './guards/authlogin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    //  canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: PrincipalComponent,
    canActivate: [AuthloginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
