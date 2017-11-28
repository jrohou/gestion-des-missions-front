import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';


@Component({
  selector: 'app-tableau-mission',
  templateUrl: './tableau-mission.component.html',
  styleUrls: ['./tableau-mission.component.css']
})

/*
* @Author : Kévin 
* EDIT : 28/11/2017
* Ne pas oublié la méthode rafraichir lorsqu'on change le statut 
*/
export class TableauMissionComponent implements OnInit {
  item: String = 'admin';
  public missions: Mission[] = [];

  /* Méthode sortDate */
  public dateDebutAsc: number = 1;

  /* Méthode sortStatut */
  public statutAsc: number = 1;

  constructor(private missionService: MissionService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => { this.missions = listeMissions; });
  }

  /*Méthode validation*/
  validerMission(id: number) {
    this.missionService.validerMission(id);

    return false;
  }

  /*Méthode rejeteMission*/
  rejeterMission(id: number) {
    this.missionService.rejeterMission(id);
  }


  /* Methode supprimer mission */
  supprimer(id: number) {
    this.missionService.supprimerMission(id);
  }

  /* Méthode sort Date ( trie ) */
  sortMissionsDate(): void {

    this.missions.sort((a: Mission, b: Mission) => {

      /* Pour a */
      const daya = a.dateDebut.dayOfMonth;
      const montha = a.dateDebut.monthValue - 1; // Month is 0-indexed
      const yeara = a.dateDebut.year;
      const dateDebutA = new Date(Date.UTC(yeara, montha, daya));

      /* Pour b */
      const dayb = b.dateDebut.dayOfMonth;
      const monthb = b.dateDebut.monthValue - 1; // Month is 0-indexed
      const yearb = b.dateDebut.year;
      const dateDebutB = new Date(Date.UTC(yearb, monthb, dayb));

      this.dateDebutAsc *= -1;

      if (dateDebutA < dateDebutB) {
        return 1 * this.dateDebutAsc;
      }

      if (dateDebutA > dateDebutB) {
        return -1 * this.dateDebutAsc;
      }
      return 0;
    });
  }

  /* Méthode sort Statut */
  sortMissionStatut(): void {
    this.missions.sort((statutA: Mission, statutB: Mission) => {

      this.statutAsc *= -1;

      if (statutA.statut < statutB.statut) {
        return 1 * this.statutAsc;
      }

      if (statutA.statut > statutB.statut) {
        return -1 * this.statutAsc;
      }
      return 0;
    });
  }

}
