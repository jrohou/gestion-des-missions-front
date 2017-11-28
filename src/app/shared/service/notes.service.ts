import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../domain/note';
import { environment } from '../../../environments/environment'
import { Observable, BehaviorSubject } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class NotesService {

  subject: BehaviorSubject<Note[]> = new BehaviorSubject([])
  constructor(private http: HttpClient) { }

  refresh(): void {
    this.http.get<Note[]>(environment.apiUrl + '/notes/').subscribe(notes => this.subject.next(notes))
  }

  sauvegarder(note: Note): void {
    this.http.post<Note>(`${environment.apiUrl}/notes`, note, httpOptions).subscribe(data => { console.log("Note enregistrée :" + data) }, error => { console.log(error) })
  }

  lister(): Observable<Note[]> {
    this.refresh()
    return this.subject.asObservable();
  }
}
