import { Component, OnInit } from '@angular/core';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';
import { Nature } from '../shared/domain/nature';

@Component({
  selector: 'app-form-mission',
  templateUrl: './form-mission.component.html',
  styleUrls: ['./form-mission.component.css']
})
export class FormMissionComponent implements OnInit {

  constructor(public missionService: MissionService) { }

  ngOnInit() {
  }

  sauvegarder(dateDebut: Date, dateFin: Date, nature: Nature, villeDepart: string, villeArrivee: String, transport: string, montantPrime: number, statut: string) {

    this.missionService.sauvegarder(new Mission(dateDebut, dateFin, nature, villeDepart, villeArrivee, transport, montantPrime, statut));
    return false;
  }

}
