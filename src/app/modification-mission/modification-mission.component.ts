import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission';
import { Nature } from '../shared/domain/nature';
import { Transport } from '../shared/domain/transport';
import { TransportService } from '../shared/service/transport.service';
import { NatureService } from '../shared/service/nature.service';
import { GoogleMapApiService } from '../shared/service/google-map-api.service'
import {Observable } from "rxjs/Rx";

@Component({
  selector: 'app-modification-mission',
  templateUrl: './modification-mission.component.html',
  styleUrls: ['./modification-mission.component.css']
})
export class ModificationMissionComponent implements OnInit {
  id:number;
  mission:Mission = null;
  tabNature: Nature[] = [];
  tabTransport: Transport[] = [];

  constructor(private route: ActivatedRoute, public transportService: TransportService, public natureService: NatureService,public missionService:MissionService, public mapApi: GoogleMapApiService) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
    this.transportService.listerTransport().subscribe(transports => { this.tabTransport = transports; console.log(this.tabTransport) });
    this.natureService.listerNature().subscribe(natures => { this.tabNature = natures ; console.log(this.tabNature)});
    this.missionService.trouverMission(this.id).subscribe(miss => {console.log(miss);this.mission = miss});
    
  }

  transportSelected(transport:Transport):Boolean{
    if(this.mission != null){
      return this.mission.transport == transport;
    }else{
      return false;
    }
    
  }

  modifier(id:HTMLInputElement, ddd: HTMLInputElement, ddf: HTMLInputElement, nature: HTMLInputElement, vdd: HTMLInputElement, vda: HTMLInputElement, transport: HTMLInputElement, statut:HTMLInputElement): void {
    let dateDebut: Date = new Date(ddd['_model'].year, ddd['_model'].month, ddd['_model'].day)
    let dateFin: Date = new Date(ddf['_model'].year, ddf['_model'].month, ddf['_model'].day)
    console.log(nature.value)
    console.log(transport.value)
    let mission: Mission = new Mission(parseInt(id.value),dateDebut, dateFin, JSON.parse(nature.value), vdd.value, vda.value, JSON.parse(transport.value), 0, statut.value)
    this.missionService.sauvegarder(mission)
  }
  

}
