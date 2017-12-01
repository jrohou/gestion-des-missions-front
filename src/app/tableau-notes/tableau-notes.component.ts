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
  
  /** LET FOR MISSION-NOTE */

  item:String="employe"
  public missions:Mission[]= [];

  public dateDebutAsc: number = 1;
  public dateFinAsc: number = 1;
 
 
  /** END OF LET FOR MISSION-NOTE */

   constructor(private missionService:MissionService) { }
 
   ngOnInit() {
     this.missionService.lister().subscribe(listeMissions => {this.missions = listeMissions; console.log(this.missions)})
     this.sortMissionDateDebut()
     this.sortMissionsDateFin()
   }

   /** METHOD FOR MISSION-NOTE */
   
  
   validerDateFin(dateFin):boolean {
     let dateNow = new Date()
      if(dateFin < dateNow)
      {
        console.log("afficher") 
        return true;
      }
      return false;

   }

   /** Table sort by dateDebut Mission */

   sortMissionDateDebut(): void {
    this.dateDebutAsc *= -1;
    this.missions.sort((a: Mission, b: Mission) => {
      return this.dateDebutAsc * (a.dateDebut.getTime() - b.dateDebut.getTime());
    });
  }

  /** Table sort by dateFin Mission  */
  
  sortMissionsDateFin(): void {
    this.dateFinAsc *= -1;
    this.missions.sort((a: Mission, b: Mission) => {
      return this.dateFinAsc * (a.dateFin.getTime() - b.dateFin.getTime());
    });
  }

  /** END OF METHOD FOR MISSION-NOTE */

}
