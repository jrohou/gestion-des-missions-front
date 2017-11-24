import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TableauMissionComponent } from './tableau-mission/tableau-mission.component';
import { FormMissionComponent } from './form-mission/form-mission.component';
import { PlanningComponent } from './planning/planning.component';
import { PrimesComponent } from './primes/primes.component';
import { TableauNaturesComponent } from './tableau-natures/tableau-natures.component';
import { TableauNotesComponent } from './tableau-notes/tableau-notes.component';
 import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { FormsModule } from '@angular/forms'
import { Http } from "@angular/http";
import { HttpModule } from '@angular/http';

import {MissionService} from './shared/service/mission.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    TableauMissionComponent,
    FormMissionComponent,
    PlanningComponent,
    PrimesComponent,
    TableauNaturesComponent,
    TableauNotesComponent
  ],
  imports: [
    BrowserModule,

    FormsModule,
    NguiAutoCompleteModule,
    HttpModule

    NgbModule.forRoot()

  ],
  providers: [MissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
