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
     this.missionService.lister().subscribe(listeMissions => {this.missions = listeMissions; console.log(this.missions)})
   }
   
   validerDateFin(dateFin):boolean {
    console.log("entrer validerdatefin")
    let parseDateFin = moment().day(dateFin.dayOfMonth).year(dateFin.year).month(dateFin.month).format('YYYY-MM-DD');
    let dateNow =  moment(new Date()).format('YYYY-MM-DD');
      if(parseDateFin < dateNow)
      {
        console.log("afficher") 
        return true;
      }
      return false;

   }

}
