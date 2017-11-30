import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission';
import { GoogleMapApiService } from '../shared/service/google-map-api.service'
import { Nature } from '../shared/domain/nature';
import { TransportService } from '../shared/service/transport.service';
import { NatureService } from '../shared/service/nature.service';
import { Transport } from '../shared/domain/transport';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-mission',
  templateUrl: '../form-mission/form-mission.component.html',
  styleUrls: ['../form-mission/form-mission.component.css']
})

export class ModificationMissionComponent {

  constructor(private route: ActivatedRoute, public transportService: TransportService, public natureService: NatureService, public missionService: MissionService, public mapApi: GoogleMapApiService, private fb: FormBuilder) {
    this.transportService.listerTransport().subscribe(transports => { this.tabTransport = transports });
    this.natureService.listerNature().subscribe(natures => { this.tabNature = natures });
    this.createForm()
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.missionService.trouverMission(this.id).subscribe(mission => {
        console.log(mission)
        this.mission = mission
        console.log("Entrée dans setValue")
        console.log(mission.dateDebut)
        this.missionForm.patchValue({
          dateDebut: {
            "year": mission.dateDebut.getFullYear(),
            "month": mission.dateDebut.getMonth() + 1,
            "day": mission.dateDebut.getDate()
          },
          dateFin: {
            "year": mission.dateFin.getFullYear(),
            "month": mission.dateFin.getMonth() + 1,
            "day": mission.dateFin.getDate()
          },
          vdd: mission.villeDepart,
          vda: mission.villeArrivee,
          nature: JSON.stringify(mission.nature),
          transport: JSON.stringify(mission.transport)
        });
      });
    });
  }

  transportSelected(id: number): boolean {
    console.log("transport id:" + id)
    if (this.mission) {
      console.log(JSON.stringify(this.mission.transport) + "selected")
      console.log(this.mission.transport.id == id)
      return this.mission.transport.id == id
    }
    return false

  }

  natureSelected(id: number): boolean {
    if (this.mission) {
      console.log(JSON.stringify(this.mission.nature) + "selected")
      return this.mission.nature.id == id
    }
    return false
  }

  missionForm: FormGroup
  tabNature: Nature[] = [];
  tabTransport: Transport[] = [];
  id: number;
  mission: Mission

  createForm() {
    this.missionForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      nature: ['', Validators.required],
      vdd: ['', Validators.required],
      vda: ['', Validators.required],
      transport: ['', Validators.required]
    }, { validator: Validators.compose([this.dateFinValidator('dateDebut', 'dateFin'), this.dateWeekEndValidator('dateDebut', 'dateFin')]) })
  }

  sauvegarder(): void {
    if (this.missionForm.valid) {
      let dateDebut: Date = new Date(this.dateDebut.value.year, this.dateDebut.value.month, this.dateDebut.value.day)
      let dateFin: Date = new Date(this.dateFin.value.year, this.dateFin.value.month, this.dateFin.value.day)
      console.log(this.nature)
      console.log(this.transport)
      let mission: Mission = new Mission(0, dateDebut, dateFin, JSON.parse(this.nature.value), this.vdd.value, this.vda.value, JSON.parse(this.transport.value), 0, "INITIALE")
      this.missionService.modifierMission(mission)
    }
  }
 
  dateWeekEndValidator(dateDebutString: string, dateFinString: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      let success: boolean = true
      let errorMsg: string = null;
      if (group.controls[dateDebutString].value) {
        let dateDebut = new Date(group.controls[dateDebutString].value.year, group.controls[dateDebutString].value.month - 1, group.controls[dateDebutString].value.day)
        if (dateDebut.getDay() == 6 || dateDebut.getDay() == 0) {
          errorMsg = "La date de debut ne peut pas être le weekend!"
          success = false
        }
      }
      if (group.controls[dateFinString].value) {
        let dateFin = new Date(group.controls[dateFinString].value.year, group.controls[dateFinString].value.month - 1, group.controls[dateFinString].value.day)
        if (dateFin.getDay() == 6 || dateFin.getDay() == 0) {
          success = false
          if (errorMsg == null) {
            errorMsg = "La date de fin ne peut pas être le weekend!"
          } else {
            errorMsg = "La date de début et fin ne peuvent pas être le weekend!"
          }

        }
      }
      return success ? null : { 'dateDebutValidator': { value: errorMsg } };
    }
  }

  dateFinValidator(dateDebutString: string, dateFinString: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      let success: boolean = true
      let errorMsg: string = ``
      if (group.controls[dateDebutString].value && group.controls[dateFinString].value) {

        let dateDebut = new Date(group.controls[dateDebutString].value.year, group.controls[dateDebutString].value.month - 1, group.controls[dateDebutString].value.day)
        let dateFin = new Date(group.controls[dateFinString].value.year, group.controls[dateFinString].value.month - 1, group.controls[dateFinString].value.day)
        if (dateFin < dateDebut) {
          errorMsg = `La date de fin ne peut pas être avant la date de début!`
          success = false
        }
        console.log("success dateFinValidator :" + success)
      }
      return success ? null : { 'dateFinValidator': { value: errorMsg } };
    };
  }

  get dateDebut() { return this.missionForm.get('dateDebut'); }
  get dateFin() { return this.missionForm.get('dateFin'); }
  get nature() { return this.missionForm.get('nature'); }
  get transport() { return this.missionForm.get('transport'); }
  get vdd() { return this.missionForm.get('vdd'); }
  get vda() { return this.missionForm.get('vda'); }
}