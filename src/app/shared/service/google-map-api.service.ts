import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';



@Injectable()
export class GoogleMapApiService {

  constructor(public http:HttpClient) { }

  observableSource = (keyword: any): Observable<any[]> => {
    let url: string = 
      'https://maps.googleapis.com/maps/api/geocode/json?address='+keyword
    if (keyword) {
      return this.http.get<any[]>(url).map(donnees=>donnees['results'])
    } else {
      return Observable.of([]);
    }
  }

}
