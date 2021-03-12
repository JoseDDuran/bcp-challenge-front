import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient }  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.basePath;
  constructor(private http:HttpClient) { }

  login(payload){
    return this.http
    .post<any>(`${this.baseUrl}/login`, payload);
  }
}
