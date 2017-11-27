import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau-mission',
  templateUrl: './tableau-mission.component.html',
  styleUrls: ['./tableau-mission.component.css']
})
export class TableauMissionComponent implements OnInit {

  public tableau: string[];
  public nom: string;

  constructor() { }

  ngOnInit() {
    this.nom = 'admin';
    this.tableau = [this.nom];
  }

}
