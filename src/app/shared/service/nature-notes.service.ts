import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NatureNote } from '../domain/nature-note';
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NatureNotesService {

  constructor(private http: HttpClient) { }

  listerNatureNote(): Observable<NatureNote[]> {
    return this.http.get<NatureNote[]>(`${environment.apiUrl}/nature-notes`)
  }

}
