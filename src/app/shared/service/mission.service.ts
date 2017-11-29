import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mission } from '../domain/mission';
import { environment } from '../../../environments/environment'
import { Observable, BehaviorSubject } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MissionService {

  subject: BehaviorSubject<Mission[]> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  refresh(): void {
    this.http.get<Mission[]>(environment.apiUrl + '/missions/').subscribe(
      missions => {
        missions.forEach(mission => {
        mission.dateDebut = this.dateFromString(mission.dateDebut);
          mission.dateFin = this.dateFromString(mission.dateFin)
        });
        this.subject.next(missions)
      })
  }

  sauvegarder(mission: Mission): void {
    this.http.post<Mission>(`${environment.apiUrl}/missions`, mission, httpOptions).subscribe(data => { console.log("Mission enregistrée :" + data) }, error => { console.log(error) })
  }

  lister(): Observable<Mission[]> {
    this.refresh()
    return this.subject.asObservable();
  }

  supprimerMission(id: number): void {
    this.http.delete<Mission[]>(environment.apiUrl + `/missions/${id}`, httpOptions).subscribe(missions => { this.subject.next(missions) })
  }


  /* Valide la mission dans la vue Visualisation des missions */
  validerMission(id: number): void {
    this.http.put<Mission>(environment.apiUrl + `/missions/${id}`, { statut: 'accepte' }, httpOptions)
      .subscribe(listeMissions => { console.log('Statut Valider réussie') }, error => { 'Le statut n\'a pas été mis à jour ' });
  }

  /* Rejeter mission dans la vue Visualisation des missions */
  rejeterMission(id: number): void {
    this.http.put<Mission>(environment.apiUrl + `/missions/${id}`, { statut: 'rejetee' }, httpOptions)
      .subscribe(listeMissions => { console.log('Statut Rejeter réussie') }, error => { 'Le statut n\'a pas été mis à jour ' });
  }

  dateFromString(date: string): Date {
    let element: string[] = date.split('-')
    return new Date(parseInt(element[0]), parseInt(element[1]), parseInt(element[2]));
  }
  trouverMission(id: number): Observable<Mission> {
    return this.http.get<Mission>(environment.apiUrl + `/missions/${id}`, httpOptions);
  }


  modifierMission(mission: Mission): Observable<Mission> {
    console.log("coucou")
    return this.http.put<Mission>(environment.apiUrl + `/missions/${mission.id}`, mission, httpOptions);
  }
}
