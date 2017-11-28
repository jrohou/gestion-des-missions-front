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
import { HttpModule } from '@angular/http';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {MissionService} from './shared/service/mission.service';
import { RouterModule, Routes } from '@angular/router';
import { ModificationMissionComponent } from './modification-mission/modification-mission.component';

const appRoutes: Routes = [
  { path: 'missions', component: TableauMissionComponent },
  { path: 'natures', component: TableauNaturesComponent },
  { path: 'notes', component: TableauNotesComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'primes', component: PrimesComponent },
  { path: 'missions/ajouter', component: FormMissionComponent },
  { path: '**', redirectTo: 'missions'}
  ];


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
    ModificationMissionComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    NguiAutoCompleteModule.forRoot(),
    FormsModule,
    NguiAutoCompleteModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
