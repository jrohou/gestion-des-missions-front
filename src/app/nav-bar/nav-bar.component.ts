import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import * as sha1 from 'sha1';

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

  checkManager():boolean{
    return this.auth.role == sha1('manager')
  }
  checkAdmin():boolean{
    return this.auth.role == sha1('admin')
  }
  

}
