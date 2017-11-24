import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Component({
  selector: "app-root",
  template: `
    <h1> Autocomplete Directive Test - Observable Source </h1>
    
    <input  ngui-auto-complete
      [(ngModel)]="selected" 
      [source]="observableSource.bind(this)"  
      list-formatter="formatted_address" />
    <br/>selected model: {{selected | json}}<br/><br/>
 `,
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  villes:any
  source:any = ['nantes']
  
  constructor(public http: Http) { }
  
  ngOnInit() {
  }

  observableSource = (keyword: any): Observable<any[]> => {
    let url: string = 
      'https://maps.googleapis.com/maps/api/geocode/json?address='+keyword
    if (keyword) {
      return this.http.get(url)
        .map(res => {
          let json = res.json();
          return json.results;
        })
    } else {
      return Observable.of([]);
    }
  }
  

  
}

//AIzaSyAbjm4JJK0wONfDovYgiGo4ZfsjmuGF0Js
