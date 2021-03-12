import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ExchangeRate } from '../models/exchangeRate';

import { HttpClient, HttpHeaders }  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangerateService {

  private baseUrl = environment.basePath + '/api/exchange-rate/v1';
  constructor(private http:HttpClient) { }

  getRates(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
    return this.http
      .get<ExchangeRate[]>(`${this.baseUrl}/rate`, { headers });
  }

  calculate(payload){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
    return this.http
      .post<any>(`${this.baseUrl}/calculate`, payload ,{ headers });
  }
}
