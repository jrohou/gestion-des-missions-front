import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { NotesService } from '../shared/service/notes.service';
import { Mission } from '../shared/domain/mission'
import { Note } from '../shared/domain/note';
import { NatureNote } from '../shared/domain/nature-note';
import { NatureNotesService } from '../shared/service/nature-notes.service';
import * as moment from 'moment';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';


@Component({
  selector: 'app-tableau-notes',
  templateUrl: './tableau-notes.component.html',
  styleUrls: ['./tableau-notes.component.css','../../assets/font-awesome-4.7.0/css/font-awesome.min.css']
})
export class TableauNotesComponent implements OnInit {
  
  item:String="employe"
  public missions:Mission[]= [];
  notes: Note[] = [];
 
 
   constructor(private missionService:MissionService, private pdfmake:PdfmakeService,private noteService: NotesService,private natureNoteService: NatureNotesService) { }
 
   ngOnInit() {
     this.missionService.lister().subscribe(listeMissions => {this.missions = listeMissions; console.log(this.missions)})

   }
   
   validerDateFin(dateFin):boolean {
     let dateNow = new Date()
      if(dateFin < dateNow)
      {
        console.log("afficher") 
        return true;
      }
      return false;

   }

   creerPdf(dateDebut:Date, dateFin:Date,nature:String,mission:number):void {
    this.pdfmake.addText("Date : "+moment(dateDebut).format('DD/MM/YYYY').toString()+" au "+moment(dateFin).format('DD/MM/YYYY').toString())
    this.pdfmake.addText("Nature : "+nature)

    this.noteService.listerNoteMission(mission).subscribe(listeNotes => { 
      if( listeNotes.length > 0) {
        listeNotes.forEach(note => {
         this.pdfmake.addText("Notes :  "+moment(note.date).format('DD/MM/YYYY').toString()+" - "+note.nature.nom+" = "+note.montant+"€")}
         
       )
      this.pdfmake.open()
      //this.pdfmake.download(""+moment(dateDebut).format('DDMMYY').toString()+moment(dateFin).format('DDMMYY').toString()+nature)
      }
    })  
    setTimeout(function () {
      window.location.reload()
    }, 500);
   }

}
