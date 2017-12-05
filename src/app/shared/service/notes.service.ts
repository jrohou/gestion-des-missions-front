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
    this.http.post<Note[]>(`${environment.apiUrl}/notes`, note, httpOptions).subscribe(notes => {
      notes.forEach(note => {
        note.date = this.dateFromString(note.date.toString());
      }); this.subject.next(notes)
    })
  }

  lister(): Observable<Note[]> {
    this.refresh()
    return this.subject.asObservable();
  }

  listerNoteMissionForPdf(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(environment.apiUrl + '/notes/mission/' + id).map(notes => {
      notes.forEach(note => {
        note.date = this.dateFromString(note.date.toString());
      });
      this.subject.next(notes)
      return notes
    })
  }

  listerNoteMission(id: number): Observable<Note[]> {
    this.http.get<Note[]>(environment.apiUrl + '/notes/mission/' + id).subscribe(notes => {
      notes.forEach(note => {
        note.date = this.dateFromString(note.date.toString());
      });
      this.subject.next(notes)
    })
    return this.subject.asObservable();
  }

  supprimerNote(id: number): void {
    this.http.delete<Note[]>(environment.apiUrl + `/notes/${id}`, httpOptions).subscribe(notes => {
      notes.forEach(note => {
        note.date = this.dateFromString(note.date.toString());
      }); this.subject.next(notes)
    })
  }

  dateFromString(date: string): Date {
    let element: string[] = date.split('-')
    return new Date(parseInt(element[0]), parseInt(element[1]) - 1, parseInt(element[2]));
  }
}
