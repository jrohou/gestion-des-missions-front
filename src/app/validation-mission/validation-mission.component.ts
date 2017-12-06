import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { AuthService } from '../shared/service/auth.service';
import { Mission } from '../shared/domain/mission';
import * as sha1 from 'sha1';
import { UserService } from '../shared/service/user.service';
import { User } from '../shared/domain/user';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.css']
})
export class ValidationMissionComponent implements OnInit {
  public missions: Mission[] = [];

  /* Méthode sortDate */
  public dateDebutAsc: number = 1;
  public dateFinAsc: number = 1;

  /* Méthode sortStatut */
  public statutAsc: number = 1;

  // ng alert
  private _success = new Subject<string>();
  private _alert = new Subject<string>();

  /* Paramètre success */
  successMessage: string;

  /* Paramètre Alert */
  alertMessage: string;
  staticAlertClosed = false;

  constructor(private missionService: MissionService, public auth: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.missionService.listerMissionSubalterne(this.auth.matricule)
    .subscribe(listMission => this.missions = listMission
      .filter(mission => mission.statut === 'EN_ATTENTE_VALIDATION' || mission.statut === 'INITIALE'))
      


    setTimeout(() => this.staticAlertClosed = true, 20000);

    /* OK */
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);

    /* Alert */
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  /*Méthode validation*/
  validerMission(id: number) {
    this.missionService.validerMission(id);
    this._success.next(`La mission a été validé avec succès`);
    this.missionService.listerMissionSubalterne(this.auth.matricule)
    .subscribe(listMission => this.missions = listMission
      .filter(mission => mission.statut === 'EN_ATTENTE_VALIDATION' || mission.statut === 'INITIALE'))
  }

  /*Méthode rejeteMission*/
  rejeterMission(id: number) {
    this.missionService.rejeterMission(id);
    this._alert.next(`La mission a rejeté avec succès`);
    this.missionService.listerMissionSubalterne(this.auth.matricule)
    .subscribe(listMission => this.missions = listMission
      .filter(mission => mission.statut === 'EN_ATTENTE_VALIDATION' || mission.statut === 'INITIALE'))
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
      return this.dateFinAsc * (a.dateFin.getFullYear() - b.dateFin.getFullYear());
    });
  }

  /* Méthode sort Statut */
  sortMissionStatut(): void {

    this.statutAsc *= -1;
    this.missions.sort((statutA: Mission, statutB: Mission) => {

      if (statutA.statut < statutB.statut) {
        return 1 * this.statutAsc;
      }

      if (statutA.statut > statutB.statut) {
        return -1 * this.statutAsc;
      }
      return 0;
    });
  }

  checkManager(): boolean {
    return this.auth.role === sha1('manager')
  }



}
