import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public roles: string[] = ['admin', 'manager', 'employe']
  public nom: string;
  constructor(private auth: AuthService) { 
    auth.authentification();
  }

  ngOnInit() {
  }

}
