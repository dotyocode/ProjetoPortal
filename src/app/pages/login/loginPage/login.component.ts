import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  windowSize: any = window.innerWidth;
  sizes = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sizes = window.innerWidth;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
