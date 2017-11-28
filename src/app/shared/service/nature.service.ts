import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Nature } from '../domain/nature';
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NatureService {

  constructor(private http: HttpClient) { }

  listerNature(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${environment.apiUrl}/natures`)
  }

}
