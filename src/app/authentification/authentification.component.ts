import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service'
import { User } from '../shared/domain/user'

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  users:User[];

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.lister().subscribe(listeUsers => {this.users = listeUsers; console.log(this.users)})
    
  }

}
