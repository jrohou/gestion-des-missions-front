import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as sha1 from 'sha1';
import { MissionService } from './mission.service';
import { Mission } from '../domain/mission';

@Injectable()
export class AuthService {
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  user:User
  users: User[];
  name: String;
  role: String;
  matricule:String;
  
  constructor(public userService: UserService) {
    this.userService.lister().subscribe(listeUsers => { this.users = listeUsers; });
    this.name = localStorage.getItem('nom');
    this.role = localStorage.getItem('role');
    if (this.name == null || this.role == null) {
      this.logout();
    }
  }

  authentification(): boolean {
    return localStorage.getItem('token') === 'true';
  }

  login(email: String, mdp: String): BehaviorSubject<User> {
    this.user = this.users.find(user => user.email === email && user.password === sha1(mdp));
    if (this.user != null) {
      localStorage.setItem('token', 'true')
      localStorage.setItem('nom', this.user.nom.toString());
      if (this.user.matricule === 'bd540e65') {
        localStorage.setItem('role', 'admin');
      } else if (this.user.subalternes.length !== 0) {
        localStorage.setItem('role', 'manager');
      } else {
        localStorage.setItem('role', 'employe');
      }
      this.name = localStorage.getItem("nom");
      this.role = localStorage.getItem("role");
      this.matricule = localStorage.getItem("matricule");
    }
    return this.userSubject;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nom');
    localStorage.removeItem('role');
  }
}
