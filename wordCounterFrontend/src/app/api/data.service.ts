import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  uri = process.env.NODE_ENV === 'production' ? environment.URI : 'http://localhost:3000/api';
  
  getData(): Observable<any> {
    console.log(process.env.NODE_ENV, this.uri)
    return this.http.get(`${this.uri}/getdata`, httpOptions);
  }
  sendData(data): Observable<any> {
    return this.http.post(`${this.uri}/postdata`, data, httpOptions);
  }
}
