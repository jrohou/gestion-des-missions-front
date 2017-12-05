import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { NotesService } from '../shared/service/notes.service';
import { Mission } from '../shared/domain/mission'
import { Note } from '../shared/domain/note';
import { NatureNote } from '../shared/domain/nature-note';
import { NatureNotesService } from '../shared/service/nature-notes.service';
import * as moment from 'moment';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';


@Component({
  selector: 'app-tableau-notes',
  templateUrl: './tableau-notes.component.html',
  styleUrls: ['./tableau-notes.component.css', '../../assets/font-awesome-4.7.0/css/font-awesome.min.css']
})
export class TableauNotesComponent implements OnInit {

  item: String = "employe"
  public missions: Mission[] = [];
  notes: Note[] = [];


  constructor(private missionService: MissionService, private pdfmake: PdfmakeService, private noteService: NotesService, private natureNoteService: NatureNotesService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => { this.missions = listeMissions; console.log(this.missions) })

  }

  validerDateFin(dateFin): boolean {
    let dateNow = new Date()
    if (dateFin < dateNow) {
      return true;
    }
    return false;

  }

  creerPdf(dateDebut: Date, dateFin: Date, nature: String, mission: number): void {
    this.pdfmake.addText("Date : " + moment(dateDebut).format('DD/MM/YYYY').toString() + " au " + moment(dateFin).format('DD/MM/YYYY').toString())
    this.pdfmake.addText("Nature : " + nature)

    this.noteService.listerNoteMissionForPdf(mission).subscribe(listeNotes => {
      if (listeNotes.length > 0) {
        listeNotes.forEach(note => {

          const dateNote = new Cell('Date');
          const natureNote = new Cell('Nature');
          const montantNote = new Cell('Montant');

          const headerRows = new Row([dateNote, natureNote, montantNote]);

          const row = new Row([new Cell(moment(note.date).format('DD/MM/YYYY').toString()), new Cell(note.nature.nom), new Cell(note.montant + " €")])

          const widths = [100, '*', 200, '*'];

          const table = new Table(headerRows, [row], widths);

          this.pdfmake.addTable(table);
        }

        )
        this.pdfmake.open()
      }
    })
    setTimeout(function () {
      window.location.reload()
    }, 50);
  }
}
