import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TableauTemplateComponent } from './tableau-template/tableau-template.component';
import { HeaderTableauMissionComponent } from './header-tableau-mission/header-tableau-mission.component';
import { LigneTableauMissionComponent } from './ligne-tableau-mission/ligne-tableau-mission.component';
import { TableauMissionComponent } from './tableau-mission/tableau-mission.component';
import { DemandeMissionComponent } from './demande-mission/demande-mission.component';
import { FormMissionComponent } from './form-mission/form-mission.component';
import { PlanningComponent } from './planning/planning.component';
import { PrimesComponent } from './primes/primes.component';
import { TableauNaturesComponent } from './tableau-natures/tableau-natures.component';
import { TableauNotesComponent } from './tableau-notes/tableau-notes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    TableauTemplateComponent,
    HeaderTableauMissionComponent,
    LigneTableauMissionComponent,
    TableauMissionComponent,
    DemandeMissionComponent,
    FormMissionComponent,
    PlanningComponent,
    PrimesComponent,
    TableauNaturesComponent,
    TableauNotesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
