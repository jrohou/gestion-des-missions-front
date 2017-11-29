import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';
import { NotesService } from '../shared/service/notes.service';
import { Note } from '../shared/domain/note';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'app-tableau-note-mission-view',
  templateUrl: './tableau-note-mission-view.component.html',
  styleUrls: ['./tableau-note-mission-view.component.css','../../assets/font-awesome-4.7.0/css/font-awesome.min.css']
})
export class TableauNoteMissionViewComponent implements OnInit {

  idmission:number;
  mission:Mission = null;
  notes:Note[]= [];
  public noteASupprimer: Note;
  public suppression: Boolean;
  closeResult: string;

  constructor(private missionService:MissionService, private noteService:NotesService, private route:ActivatedRoute,  private modalService: NgbModal) {
    
   
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.idmission = params['idmission'];});
    this.noteService.listerNoteMission(this.idmission).subscribe(listeNotes => {this.notes = [];listeNotes.forEach(note=>{this.notes.push(note)})});
    this.missionService.trouverMission(this.idmission).subscribe(miss => {console.log(miss);this.mission = miss});
  }

  openSupprimer(contentSup, note: Note) {
    this.noteASupprimer = note;
    this.modalService.open(contentSup).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); 
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  supprimer(id: number) {
    this.noteService.supprimerNote(id);
  }

}