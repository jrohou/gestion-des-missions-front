import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {

  }
  
  public ping() {
    this.http.get(environment.apiUrl)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}

