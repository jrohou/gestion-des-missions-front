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

  /* Ne pas tenir compte des erreurs lié à mission.dateDebut le code compile et est fonctionnel */
  refresh(): void {
      this.http.get<Mission[]>(environment.apiUrl + '/missions/').subscribe(
        missions => {missions.forEach(mission=>{mission.dateDebut=this.dateFromString(mission.dateDebut.toString()); mission.dateFin=this.dateFromString(mission.dateFin.toString())}) ; this.subject.next(missions)})
  }

  sauvegarder(mission: Mission): void {
    this.http.post<Mission>(`${environment.apiUrl}/missions`, mission, httpOptions).subscribe(data => { console.log("Mission enregistrée :" + data) }, error => { console.log(error) })
  }

  /* Permet de lister les missions */
  lister(): Observable<Mission[]> {
    this.refresh()
    return this.subject.asObservable();
  }

  /* Permet de supprimer une mission via son Id sélectionner */
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

  /* Convertie une date string en format Date */
  dateFromString(date: string): Date {
    let element: string[] = date.split('-')
    return new Date(parseInt(element[0]), parseInt(element[1]), parseInt(element[2]));
  }
}
