import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public roles: string[] = ['admin', 'manager', 'employe']
  public nom: string;
  constructor() { }

  ngOnInit() {
  }

}
