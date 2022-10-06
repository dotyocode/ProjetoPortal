import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginBoxService } from './pages/login/loginPage/login-box/auth.service';
import { sideNavToggle } from './shared/model/side-nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portalStrategy';
  mostrarMenu: boolean = false;

  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;

  getToken = window.localStorage.getItem('token');

  constructor(private authService: LoginBoxService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.mostrarMenuEmmiter.subscribe(response => {
      this.mostrarMenu = response;
    })
    if (this.getToken !== null) {
      this.mostrarMenu = true;
    } else {
      this.mostrarMenu = false;
    }
  }

  onToggleSideNav(data: sideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
