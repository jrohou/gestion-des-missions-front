import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service'
import { User } from '../shared/domain/user'
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  users:User[];

  constructor(public userService:UserService, public authService:AuthService) { }

  ngOnInit() {
    this.userService.lister().subscribe(listeUsers => {this.users = listeUsers; console.log(this.users)})
  }

  connexion(email:String, mdp:String){
    this.authService.login(email, mdp);
  }

}
