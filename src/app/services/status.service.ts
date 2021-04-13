import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(public http: HttpClient) {
  }

  public getCurrentStatus(): Observable<any> {
    const url = 'http://localhost:3000/guests/currentStatus';
    // const url = 'https://lm-wedding-backend.herokuapp.com/guests/currentStatus';
    return this.http.get(url);
  }

  public getStatistics(): Observable<any> {
    const url = 'http://localhost:3000/guests/statistics';
    // const url = 'https://lm-wedding-backend.herokuapp.com/guests/statistics';
    return this.http.get(url);
  }

  public downloadCsv(): Observable<any> {
    const url = 'http://localhost:3000/guests/downloadCsv';
    // const url = 'https://lm-wedding-backend.herokuapp.com/guests/downloadCsv';
    return this.http.get(url,  { headers: new HttpHeaders({ 'Content-Type': 'contentType'  }), observe: 'response', responseType: 'text'});
  }

}
