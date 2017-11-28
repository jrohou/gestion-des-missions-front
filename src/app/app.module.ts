import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { MissionService } from './shared/service/mission.service'
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapApiService } from './shared/service/google-map-api.service';
import { TransportService } from './shared/service/transport.service';
import { NatureService } from './shared/service/nature.service';




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
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [MissionService, GoogleMapApiService, TransportService, NatureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
