import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TableauMissionComponent } from './tableau-mission/tableau-mission.component';
import { FormMissionComponent } from './form-mission/form-mission.component';
import { PlanningComponent } from './planning/planning.component';
import { PrimesComponent } from './primes/primes.component';
import { TableauNaturesComponent } from './tableau-natures/tableau-natures.component';
import { TableauNotesComponent } from './tableau-notes/tableau-notes.component';
import { FormsModule } from '@angular/forms'
import { MissionService } from './shared/service/mission.service'
import { GoogleMapApiService } from './shared/service/google-map-api.service';
import { TransportService } from './shared/service/transport.service';
import { NatureService } from './shared/service/nature.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ModificationMissionComponent } from './modification-mission/modification-mission.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UserService } from './shared/service/user.service'
import { NotesService } from './shared/service/notes.service';
import { NatureNotesService } from './shared/service/nature-notes.service';
import { TableauNoteMissionViewComponent } from './tableau-note-mission-view/tableau-note-mission-view.component';
import { AuthService } from './shared/service/auth.service';
import { ValidationMissionComponent } from './validation-mission/validation-mission.component';
import { AccueilComponent } from './accueil/accueil.component';

const appRoutes: Routes = [
  { path: 'missions', component: TableauMissionComponent },
  { path: 'natures', component: TableauNaturesComponent },
  { path: 'notes', component: TableauNotesComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'primes', component: PrimesComponent },
  { path: 'missions/ajouter', component: FormMissionComponent },
  { path: 'notes/:idmission', component: TableauNoteMissionViewComponent },
  { path: 'missions/:id/modifier', component: ModificationMissionComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'validation', component: ValidationMissionComponent },
  { path: '**', component: AccueilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TableauMissionComponent,
    FormMissionComponent,
    PlanningComponent,
    PrimesComponent,
    TableauNaturesComponent,
    TableauNotesComponent,
    TableauNoteMissionViewComponent,
    ModificationMissionComponent,
    AuthentificationComponent,
    ValidationMissionComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    NguiAutoCompleteModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],

  providers: [
    MissionService,
    GoogleMapApiService,
    TransportService,
    NatureService,
    UserService,
    NotesService,
    AuthService,
    NatureNotesService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
