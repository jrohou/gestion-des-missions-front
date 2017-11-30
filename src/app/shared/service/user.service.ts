import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../domain/user';
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  lister(): Observable<User[]> {
    return this.http.get<User[]>(`https://raw.githubusercontent.com/DiginamicFormation/ressources-atelier/master/users.json`)
  }
}
