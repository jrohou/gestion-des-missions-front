import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Nature } from '../domain/nature';
import { Observable, BehaviorSubject } from "rxjs";

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
  sauvegarder(nature: Nature): Observable<Nature>{
    return this.http.post<Nature>(environment.apiUrl+ `/natures`, nature, httpOptions).map(natAjout => {
      let tab = this.nature.getValue();
      tab.push(natAjout);
      this.nature.next(tab);
      return natAjout;
    });
    /* return this.http.post<Nature[]>(environment.apiUrl+ `/natures`, nature, httpOptions).subscribe(data => { console.log("Nature enregistrée :" + data) }, error => { console.log(error) }); */
  }

  modifierNature(id: number): Observable<Nature>{
    return this.http.put<Nature>(environment.apiUrl+ `/natures/id`, httpOptions);
  }

  /* Permet de supprimer une mission via son Id sélectionner */
  supprimerNature(id: number): void {
    this.http.delete<Nature[]>(environment.apiUrl + `/nature/${id}`, httpOptions).subscribe(natures => { this.nature.next(natures) })
  }

}
