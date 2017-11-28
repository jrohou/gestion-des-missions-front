import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mission } from '../domain/mission';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MissionService {

  subject: BehaviorSubject<Mission[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  sauvegarder(mission: Mission): void {
    this.http.post<Mission>(environment.apiUrl + '/missions/', mission,
      httpOptions).subscribe(col => {
        const collegues = this.subject.getValue();
        collegues.push(col);
        this.subject.next(collegues);
      });
  }

  refresh(): void {
    this.http.get<Mission[]>(environment.apiUrl + '/missions', httpOptions)
      .subscribe(mission => this.subject.next(mission));
  }

  lister(): Observable<Mission[]> {
    this.refresh();
    return this.subject.asObservable();
  }


  /* Valide la mission dans la vue Visualisation des missions */
  validerMission(id: number): void {
    this.http.put<Mission>(environment.apiUrl + `/missions/${id}`, {statut: 'accepte'}, httpOptions)
    .subscribe(listeMissions => { console.log('Statut Valider réussie') }, error => { 'Le statut n\'a pas été mis à jour ' });
  }

  /* Rejeter mission dans la vue Visualisation des missions */
  rejeterMission(id: number): void {
    this.http.put<Mission>(environment.apiUrl + `/missions/${id}`, {statut: 'rejetee'}, httpOptions)
      .subscribe(listeMissions => { console.log('Statut Rejeter réussie') }, error => { 'Le statut n\'a pas été mis à jour ' });
  }

  /* Supprimer mission dans la vue gestion des missions*/
  supprimerMission(id: number): void {
    this.http.delete<Mission>(environment.apiUrl + `/missions/${id}`, httpOptions)
      .subscribe(listeMissions => { console.log('Supression réussie') }, error => { 'Perdu' });
  }
}
