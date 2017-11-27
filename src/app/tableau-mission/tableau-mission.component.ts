import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission'

@Component({
  selector: 'app-tableau-mission',
  templateUrl: './tableau-mission.component.html',
  styleUrls: ['./tableau-mission.component.css']
})
export class TableauMissionComponent implements OnInit {



  missions:Mission[];
  constructor(private missionService:MissionService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => this.missions = listeMissions)
  }

}
