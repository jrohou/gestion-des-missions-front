import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Nature } from '../domain/nature';
import { Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NatureService {

  nature: BehaviorSubject<Nature[]> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  refresh(): void {
    this.http.get<Nature[]>(`${environment.apiUrl}/natures`).subscribe(natures => this.nature.next(natures));
  }

  /* Permet de lister les missions */
  listerNature(): Observable<Nature[]> {
    this.refresh()
    return this.nature.asObservable();
  }

  /* Ajout d'une nature de mission */
  sauvegarder(nature: Nature): Observable<Nature> {
    return this.http.post<Nature>(environment.apiUrl + `/natures`, nature, httpOptions).map(natAjout => {
      const tab = this.nature.getValue();
      tab.push(natAjout);
      this.nature.next(tab);
      return natAjout;
    });
  }

  modifierNature(nature: Nature): Observable<Nature> {
    return this.http.put<Nature>(environment.apiUrl + `/natures/${nature.id}`, nature, httpOptions).map(natUpdate => {
      const natureUpd = this.nature.getValue();
      this.nature.next(natureUpd);
      return natUpdate;
    });
  }

  /* Permet de supprimer une mission via son Id sélectionner */
  supprimerNature(id: number): void {
    this.http.delete<Nature[]>(environment.apiUrl + `/natures/${id}`, httpOptions).subscribe(natures => { this.nature.next(natures) })
  }

  naturePeutEtreSupprimee(id: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + `/natures/${id}/deletable`, httpOptions)
  }

}
