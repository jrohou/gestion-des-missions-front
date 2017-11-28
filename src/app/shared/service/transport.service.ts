import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs";
import { Transport } from '../domain/transport';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TransportService {

  constructor(private http: HttpClient) { }
  
    listerTransport(): Observable<Transport[]> {
      return this.http.get<Transport[]>(`${environment.apiUrl}/transports`)
    }
}
