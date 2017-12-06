import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service'
import { Mission } from '../shared/domain/mission'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-tableau-mission',
  templateUrl: './tableau-mission.component.html',
  styleUrls: ['./tableau-mission.component.css']
})
export class TableauMissionComponent implements OnInit {
  public missions: Mission[] = [];
  public suppression: Boolean;
  public missionASupprimer: Mission;

  /* Méthode sortDate */
  public dateDebutAsc: number = 1;
  public dateFinAsc: number = 1;

  /* Méthode sortStatut */
  public statutAsc: number = 1;


  closeResult: string;

  constructor(private missionService: MissionService, private modalService: NgbModal, public authService: AuthService) {
  }

  ngOnInit() {
    this.missionService.lister().subscribe(listeMissions => { this.missions = listeMissions; })
  }

  /* Modal */
  open(content, mission: Mission) {
    this.missionASupprimer = mission;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }
  /* Modal */

  supprimer(id: number) {
    this.missionService.supprimerMission(id);
    this.suppression = false;

  }

  /* Méthode sort Date ( trie ) */
  sortMissionsDateDebut(): void {
    this.dateDebutAsc *= -1;
    console.log(this.missions)
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


}
