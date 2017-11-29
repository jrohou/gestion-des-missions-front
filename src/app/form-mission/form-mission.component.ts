import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission';
import { GoogleMapApiService } from '../shared/service/google-map-api.service'
import { Nature } from '../shared/domain/nature';
import { TransportService } from '../shared/service/transport.service';
import { NatureService } from '../shared/service/nature.service';
import { Transport } from '../shared/domain/transport';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms/src/form_builder';


@Component({
  selector: 'app-form-mission',
  templateUrl: './form-mission.component.html',
  styleUrls: ['./form-mission.component.css']
})

export class FormMissionComponent implements OnInit {

  constructor(public transportService: TransportService, public natureService: NatureService, public missionService: MissionService, public mapApi: GoogleMapApiService, private fb : FormBuilder) { }

  missionForm: FormGroup

  tabNature: Nature[] = [];
  tabTransport: Transport[] = [];

  ngOnInit() {
    this.transportService.listerTransport().subscribe(transports => { this.tabTransport = transports; console.log(this.tabTransport) });
    this.natureService.listerNature().subscribe(natures => { this.tabNature = natures ; console.log(this.tabNature)});
    this.createForm();
  }

  sauvegarder(ddd: HTMLInputElement, ddf: HTMLInputElement, nature: HTMLInputElement, vdd: HTMLInputElement, vda: HTMLInputElement, transport: HTMLInputElement): void {
    let dateDebut: Date = new Date(ddd['_model'].year, ddd['_model'].month, ddd['_model'].day)
    let dateFin: Date = new Date(ddf['_model'].year, ddf['_model'].month, ddf['_model'].day)
    console.log(nature.value)
    console.log(transport.value)
    let mission: Mission = new Mission(0,dateDebut, dateFin, JSON.parse(nature.value), vdd.value, vda.value, JSON.parse(transport.value), 0, "INITIALE")
    this.missionService.sauvegarder(mission)
  }

  createForm(){
    this.missionForm = this.fb.group({
      
    }) 
  }
}
