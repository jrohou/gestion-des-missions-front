import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.css']
})
export class PrimesComponent implements OnInit {

  missions: Mission[];

  /* Méthode sortDate */
  public dateDebutAsc: number = 1;
  public dateFinAsc: number = 1;

  /* Méthode sortStatut */
  public statutAsc: number = 1;

  /*Methode pour récupérer les annees*/
  public annees: number[] = [];
  public annee: number = 0;

  constructor(public missionService: MissionService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => {
      this.missions = listeMissions.filter(mission => {
        if (mission.statut == "VALIDEE") {
          if (this.annee != 0) {
            mission.dateDebut.getFullYear() == this.annee
          }
          return mission;
        }
      });
      listeMissions.forEach(mission => {
        if (!this.annees.includes(mission.dateDebut.getFullYear())) {
          this.annees.push(mission.dateDebut.getFullYear());
        };
      });
    });
  }

  /* Méthode sort Date ( trie ) */
  sortMissionsDateDebut(): void {
    this.dateDebutAsc *= -1;
    this.missions.sort((a: Mission, b: Mission) => {
      return this.dateDebutAsc * (a.dateDebut.getTime() - b.dateDebut.getTime());
    });
  }

  sortMissionsDateFin(): void {
    this.dateFinAsc *= -1;
    this.missions.sort((a: Mission, b: Mission) => {
      return this.dateFinAsc * (a.dateFin.getTime() - b.dateFin.getTime());
    });
  }

  /* Méthode pour trier en fonction des annees */
  changeTab(annee: number): void {
    this.annee = annee;
    this.missionService.lister().subscribe(listeMissions => {
      this.missions = listeMissions.filter(mission => mission.dateDebut.getFullYear() == annee);
    });
  }
}
