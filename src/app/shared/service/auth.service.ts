import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as sha1 from 'sha1';

@Injectable()
export class AuthService {
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  user: User;
  users: User[];
  name:String;
  role:String;

  constructor(public userService: UserService) {
    this.userService.lister().subscribe(listeUsers => { this.users = listeUsers; })
  }

  authentification(): boolean {
    return localStorage.getItem("token") == "true";
  }

  identifier(email: String, mdp: String): BehaviorSubject<User> {
    this.user = this.users.find(user => user.email == email && user.password == sha1(mdp));
    if(this.user!=null){
      localStorage.setItem("token", "true")
      this.name = this.user.nom;
      if(this.user.subalternes.length != 0){
        this.role = "manager";
      }else{
        this.role = "employe";
      }
      console.log(this.authentification());
    }
    return this.userSubject;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("nom");
    localStorage.removeItem("role");
  }
}
