import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


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
import { HttpModule } from '@angular/http';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';

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
    TableauNotesComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot()
    FormsModule,
    NguiAutoCompleteModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [MissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
