import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../shared/service/mission.service'

@Component({
  selector: 'app-modification-mission',
  templateUrl: './modification-mission.component.html',
  styleUrls: ['./modification-mission.component.css']
})
export class ModificationMissionComponent implements OnInit {
  id:number;

  constructor(private route: ActivatedRoute, missionService:MissionService) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
  }

}
