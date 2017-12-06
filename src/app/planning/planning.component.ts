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
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['../../../node_modules/angular-calendar/css/angular-calendar.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit {

  constructor(private missionService: MissionService) { }
  view: string = 'month';
  
  viewDate: Date = new Date();
  events:Observable<any[]>
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
    this.events = this.missionService.lister()
                    .map(
      missions =>  missions.map(mission => {
        return {
            start: startOfDay(mission.dateDebut),
            end: endOfDay(mission.dateFin),
            title: mission.nature.nom,
            color: this.colors.blue,
            actions: []
      }})
      )
  }

  activeDayIsOpen: boolean = true;
  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }

    nextYear(date:Date){
      date.setFullYear(date.getFullYear() + 1);
      return date;
    }
}
