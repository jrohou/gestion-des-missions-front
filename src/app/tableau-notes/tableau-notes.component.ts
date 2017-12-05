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

  /** LET FOR MISSION NOTE */

  item: String = "employe"
  public missions: Mission[] = [];
  notes: Note[] = [];

  public dateDebutAsc: number = 1;
  public dateFinAsc: number = 1;

  /** END FOR MISSION NOTE */


  constructor(private missionService: MissionService, private noteService: NotesService, private natureNoteService: NatureNotesService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => { listeMissions.forEach(mission => { this.missionService.trouverMissionFrais(mission.id).subscribe(frais => { console.log(frais); mission.frais = frais }) }); this.missions = listeMissions; console.log(this.missions) });
  }

  /** Check Date now > dateFin */

  validerDateFin(dateFin): boolean {
    let dateNow = new Date()
    if (dateFin < dateNow) {
      return true;
    }
    return false;
  }

  /** Create PDF file */

  creerPdf(dateDebut: Date, dateFin: Date, nature: String, mission: number, frais: number): void {
    const pdfmake = new PdfmakeService()
    pdfmake.addText("Date : " + moment(dateDebut).format('DD/MM/YYYY').toString() + " au " + moment(dateFin).format('DD/MM/YYYY').toString())
    pdfmake.addText("Nature : " + nature)

    this.noteService.listerNoteMissionForPdf(mission).subscribe(listeNotes => {
      if (listeNotes.length > 0) {
        const dateNote = new Cell('Date');
        const natureNote = new Cell('Nature');
        const montantNote = new Cell('Montant');
        const row: Row[] = [];
        const headerRows = new Row([dateNote, natureNote, montantNote]);
        const widths = [100, '*', 200, '*'];
        listeNotes.forEach(note => {
          row.push(new Row([new Cell(moment(note.date).format('DD/MM/YYYY').toString()), new Cell(note.nature.nom), new Cell(note.montant + " €")]));
        }

        )
        const table = new Table(headerRows, row, widths);
        pdfmake.addTable(table);
        pdfmake.addText("Montant total : " + frais + "€")
        pdfmake.open()
      }
    })
  }

  /** Sort by dateDebut */

  sortMissionsDateDebut(): void {
    this.dateDebutAsc *= -1;
    this.missions.sort((a: Mission, b: Mission) => {
      return this.dateDebutAsc * (a.dateDebut.getTime() - b.dateDebut.getTime());
    });
  }

  /** Sort by dateFin */
  
  sortMissionsDateFin(): void {
    this.dateFinAsc *= -1;
    this.missions.sort((a: Mission, b: Mission) => {
      return this.dateFinAsc * (a.dateFin.getTime() - b.dateFin.getTime());
    });
  }
}
