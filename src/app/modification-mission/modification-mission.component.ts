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
import { ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-form-mission',
  templateUrl: '../form-mission/form-mission.component.html',
  styleUrls: ['../form-mission/form-mission.component.css']
})

export class ModificationMissionComponent {

  missionForm: FormGroup
  tabNature: Nature[] = [];
  tabTransport: Transport[] = [];
  id: number;
  mission: Mission

  constructor(private router:Router, private route: ActivatedRoute, public transportService: TransportService, public natureService: NatureService, public missionService: MissionService, public mapApi: GoogleMapApiService, private fb: FormBuilder) {
    this.transportService.listerTransport().subscribe(transports => { this.tabTransport = transports });
    this.natureService.listerNature().subscribe(natures => { this.tabNature = natures });
    this.createForm()
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.missionService.trouverMission(this.id).subscribe(mission => {
        this.mission = mission
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
          nature: mission.nature,
          transport: mission.transport
        });
      });
    });
  }

  byId(item1: any, item2: any): boolean {
    if (item1 == null || item2 == null) {
      return false
    }
    return item1.id == item2.id
  }

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
      let vdd : string 
      let vda : string
      if(this.vdd.value.formatted_address==null){
        vdd = this.vdd.value
      }else{
        vdd = this.vdd.value.formatted_address
      }
      if(this.vda.value.formatted_address==null){
        vda = this.vda.value
      }else{
        vda = this.vda.value.formatted_address
      }
      let mission: Mission = new Mission(this.mission.id, dateDebut, dateFin, this.nature.value, vdd, vda, this.transport.value, this.mission.montantPrime, this.mission.statut)
      this.missionService.modifierMission(mission).subscribe(data=>this.router.navigate(['/missions']))
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