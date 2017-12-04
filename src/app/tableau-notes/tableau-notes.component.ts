import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission'
import * as moment from 'moment';


@Component({
  selector: 'app-tableau-notes',
  templateUrl: './tableau-notes.component.html',
  styleUrls: ['./tableau-notes.component.css','../../assets/font-awesome-4.7.0/css/font-awesome.min.css']
})
export class TableauNotesComponent implements OnInit {
  
  item:String="employe"
  public missions:Mission[]= [];
 
 
   constructor(private missionService:MissionService) { }
 
   ngOnInit() {
     this.missionService.lister().subscribe(listeMissions => {this.missions = listeMissions;})
   }
   
   validerDateFin(dateFin):boolean {
     let dateNow = new Date()
      if(dateFin < dateNow)
      {
        return true;
      }
      return false;

   }

}
