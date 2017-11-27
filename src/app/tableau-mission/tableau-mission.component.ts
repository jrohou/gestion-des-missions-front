import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission'

@Component({
  selector: 'app-tableau-mission',
  templateUrl: './tableau-mission.component.html',
  styleUrls: ['./tableau-mission.component.css']
})
export class TableauMissionComponent implements OnInit {
  item:String="employe"
  public missions:Mission[]= [];
  public suppression:Boolean;
  public missionASupprimer:Mission;

  constructor(private missionService:MissionService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => {this.missions = listeMissions;})
  }    

  validerSuppression(mission:Mission){
    this.suppression = true;
    this.missionASupprimer = mission;
  }

  supprimer(id:number){
    this.missionService.supprimerMission(id);
    this.suppression=false;
  }

}
