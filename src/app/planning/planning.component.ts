import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['../../../node_modules/angular-calendar/css/angular-calendar.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit {

  constructor(private missionService: MissionService) { }
  
  viewDate: Date = new Date();
  events = []
  colors = {
    green: {
      primary: '##51C244',
      secondary: '#469A3C'
    },
    blue: {
      primary: '#5A8CD8',
      secondary: '#406397'
    }
  }

  ngOnInit() {
    this.events = []
    this.missionService.lister().subscribe(
      missions => {
        missions.forEach(mission => {
          this.events.push({
            start: startOfDay(mission.dateDebut),
            end: endOfDay(mission.dateFin),
            title: mission.nature.nom,
            color: this.colors.blue,
            actions: []
          })
        })
      })
  }

}
