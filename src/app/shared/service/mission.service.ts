import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Mission } from '../domain/mission';
import { environment } from '../../../environments/environment'
import {Observable, BehaviorSubject} from "rxjs/Rx";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable()
export class MissionService {

  subject:BehaviorSubject<Mission[]>  = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  sauvegarder(mission:Mission):void {
    this.http.post<Mission>(environment.apiUrl + '/missions/', mission,
       httpOptions).subscribe(col =>{
         const collegues = this.subject.getValue()
         collegues.push(col);
         this.subject.next(collegues)
       });
   }

   lister():Observable<Mission[]>{
    return this.http.get<Mission[]>(environment.apiUrl + '/missions', httpOptions)
   }

  supprimerMission(id:number):void{
    this.http.delete<Mission>(environment.apiUrl + `/missions/${id}`, httpOptions).subscribe(listeMissions=>{console.log("Supression réussie")}, error =>{"Perdu"});
  }
}
