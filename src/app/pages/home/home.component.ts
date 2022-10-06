import { Component, Input, OnInit } from '@angular/core';
import { sideNavToggle } from 'src/app/shared/model/side-nav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @Input() collapsed: boolean = false;
  // @Input() screenWidth: number = 0;

  // constructor() { }

  // ngOnInit(): void {
  // }

  // getBodyClass(): string {
  //   let styleClass = '';
  //   if (this.collapsed && this.screenWidth > 768) {
  //     styleClass = 'body-trimmed'
  //   } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
  //     styleClass = 'body-md-screen'
  //   }
  //   return styleClass;
  // }

  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav(data: sideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
