import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';
import * as moment from 'moment';
import { AuthService } from '../shared/service/auth.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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

  constructor(public missionService: MissionService, private auth: AuthService) { }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => {
      this.missions = listeMissions.filter(mission => {
        if (mission.statut === "VALIDEE") {
          if (this.annee !== 0) {
            mission.dateDebut.getFullYear() === this.annee
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
    if(annee!=0) {
      this.annee = annee;
      this.missionService.lister().subscribe(listeMissions => {
        this.missions = listeMissions.filter(mission => { if (mission.statut == "VALIDEE" && mission.dateDebut.getFullYear() == annee) { return mission } });
      });
    }else{
      this.missionService.lister().subscribe(listeMissions => {
        this.missions = listeMissions.filter(mission => { if (mission.statut == "VALIDEE") { return mission } });
      });
    }

  }

  exportexcel(): void {
    let data = [{
      dateDebut: "Date de début",
      dateFin: "Date de fin",
      Nature: "Nature",
      Prime: "Prime",
    }];
    this.missions.forEach(mission => data.push(
      {
        dateDebut: moment(mission.dateDebut).format('DD/MM/YYYY').toString(),
        dateFin: moment(mission.dateFin).format('DD/MM/YYYY').toString(),
        Nature: mission.nature.nom,
        Prime: mission.montantPrime.toString()
      }));

    new Angular2Csv(data, this.auth.name);

  }
}
