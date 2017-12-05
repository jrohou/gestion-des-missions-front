import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';
import { NotesService } from '../shared/service/notes.service';
import { Note } from '../shared/domain/note';
import { NatureNote } from '../shared/domain/nature-note';
import { NatureNotesService } from '../shared/service/nature-notes.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-tableau-note-mission-view',
  templateUrl: './tableau-note-mission-view.component.html',
  styleUrls: ['./tableau-note-mission-view.component.css', '../../assets/font-awesome-4.7.0/css/font-awesome.min.css']
})
export class TableauNoteMissionViewComponent implements OnInit {


  constructor(private missionService: MissionService, private noteService: NotesService, private route: ActivatedRoute, private modalService: NgbModal, private natureNoteService: NatureNotesService, private fb: FormBuilder) {
    this.route.params.subscribe(params => { this.idmission = params['idmission']; });
    this.missionService.trouverMission(this.idmission).subscribe(miss => { this.mission = miss });
    this.natureNoteService.listerNatureNote().subscribe(natureNotes => { this.tabNatureNote = natureNotes; });
    this.noteService.listerNoteMission(this.idmission).subscribe(listeNotes => { this.notes = []; listeNotes.forEach(note => { this.notes.push(note) }) });
    this.createForm();

  }

  /** LET FOR NOTES */

  noteForm: FormGroup
  ajout: boolean
  idmission: number;
  mission: Mission = null;
  notes: Note[] = [];
  tabNatureNote: NatureNote[] = [];
  public noteAModifier: Note;
  public noteASupprimer: Note;
  public suppression: Boolean;
  closeResult: string;
  public dateNote: number = 1;

  /** END OF LET */

  /** Form for validator */

  createForm() {
    this.noteForm = this.fb.group({
      date: ['', [Validators.required, this.dateIncluseValidator()]],
      nature: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
    }, { validator: Validators.compose([this.noteUniqueValidator('date', 'nature')]) })
  }

  byId(nature1: NatureNote, nature2: NatureNote): boolean {
    if (nature1 == null || nature2 == null) {
      return false
    }
    return nature1.id == nature2.id
  }

  /** Validator to check note date is between dateDebut and dateFin */
  
  dateIncluseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let success: boolean = true
      if (this.mission) {
        if (control.value) {
          let date = new Date(control.value.year, control.value.month - 1, control.value.day)
          if (date.getTime() > this.mission.dateFin.getTime() || date.getTime() < this.mission.dateDebut.getTime()) {
            success = false
          }
        }
      }
      return success ? null : { 'dateIncluseValidator': { value: `La date de la note doit être incluse entre le ${this.mission.dateDebut.toLocaleDateString()} et le ${this.mission.dateFin.toLocaleDateString()}` } };
    }
  }

  /** Validator to check note details already exist */

  noteUniqueValidator(dateString: string, natureString: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      let success: boolean = true
      let date = null
      if (group.controls[dateString].value) {
        date = new Date(group.controls[dateString].value.year, group.controls[dateString].value.month - 1, group.controls[dateString].value.day)
        let nature: NatureNote = null
        if (group.controls[natureString].value) {
          nature = group.controls[natureString].value
          if (this.notes.find(note => (note.date.getTime() == date.getTime() && note.nature.id == nature.id))) {
            if (this.noteAModifier == null) {
              success = false
            } else {
              if (this.noteAModifier.id != this.notes.find(note => (note.date.getTime() == date.getTime() && note.nature.id == nature.id)).id) {
                success = false
              }
            }

          }
        }
      }
      return success ? null : { 'noteUniqueValidator': { value: "Une note de même nature existe déjà à cette date" } };
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => { this.idmission = params['idmission']; });
    this.noteService.listerNoteMission(this.idmission).subscribe(listeNotes => { this.notes = []; listeNotes.forEach(note => { this.notes.push(note) }) });
    this.missionService.trouverMission(this.idmission).subscribe(miss => { console.log(miss); this.mission = miss });
    this.sortNotesDate()
  }


  /** Open Delete Modal */

  openSupprimer(contentSup, note: Note) {
    this.noteASupprimer = note;
    this.modalService.open(contentSup).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** Open Edit Modal */

  openModifier(content, note: Note) {
    this.noteAModifier = note;
    this.noteForm.patchValue({
      date: {
        "year": note.date.getFullYear(),
        "month": note.date.getMonth() + 1,
        "day": note.date.getDate()
      },
      nature: note.nature,
      montant: note.montant
    })
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** Open Add Modal */

  openAjout(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  /** Click to close modal */

  private getDismissReason(reason: any): string {
    this.resetForm()
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /** Call supprimerNote method */

  supprimer(id: number) {
    this.noteService.supprimerNote(id);
  }

  /** Call sauvegarder method */

  sauvegarder() {
    let dateNote: Date = new Date(this.date.value.year, this.date.value.month, this.date.value.day)
    let id: number = null
    if (this.noteAModifier != null) {
      id = this.noteAModifier.id
    }
    let note: Note = new Note(id, dateNote, this.nature.value, this.montant.value, this.mission)
    this.noteService.sauvegarder(note)
    this.resetForm()
  }

  get date() { return this.noteForm.get('date'); }
  get nature() { return this.noteForm.get('nature'); }
  get montant() { return this.noteForm.get('montant'); }

  /** Reset add and edit form */

  resetForm(): void {
    this.noteAModifier = null
    this.noteForm.reset({
      date: null,
      nature: null,
      montant: ''
    })
  }

  /** Sort by date */

  sortNotesDate(): void {
    this.dateNote *= -1;
    this.notes.sort((a: Note, b: Note) => {
      return this.dateNote * (a.date.getTime() - b.date.getTime());
    });
  }
}
