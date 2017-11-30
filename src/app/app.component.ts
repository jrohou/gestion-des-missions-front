import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) { 
    auth.authentification();
  }
  ngOnInit() {

  }
}

// tslint:disable-next-line:eofline
