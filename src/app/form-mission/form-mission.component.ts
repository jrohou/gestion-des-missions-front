import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission';
import { GoogleMapApiService } from '../shared/service/google-map-api.service'
import { Nature } from '../shared/domain/nature';


@Component({
  selector: 'app-form-mission',
  templateUrl: './form-mission.component.html',
  styleUrls: ['./form-mission.component.css']
})

export class FormMissionComponent implements OnInit {

  constructor(public missionService: MissionService, public mapApi: GoogleMapApiService) { }

  ngOnInit() {
  }

  sauvegarder(ddd: HTMLInputElement, ddf: HTMLInputElement, nature: HTMLInputElement, vdd: HTMLInputElement, vda: HTMLInputElement, transport: HTMLInputElement): void {
    let dateDebut: Date = new Date(ddd['_model'].year, ddd['_model'].month, ddd['_model'].day)
    let dateFin: Date = new Date(ddf['_model'].year, ddf['_model'].month, ddf['_model'].day)
    let nat:Nature = new Nature(1,"nature", new Date(2017,1,1),new Date(2017,1,1), true, true, 10)
    let mission: Mission = new Mission(dateDebut, dateFin, nat, vdd.value, vda.value, transport.value, 0, "INITIALE")
    this.missionService.sauvegarder(mission)
  }
}
