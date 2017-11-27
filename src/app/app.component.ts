import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

// tslint:disable-next-line:eofline
}