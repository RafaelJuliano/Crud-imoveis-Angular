import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Property } from '../interfaces/property';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getProperties(): Observable<Property[]> {
    const token: string = this.sharedService.getCookie('token');
    console.log(token);
    const header: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + token })
    const url: string = `${environment.apiUrl}/imoveis`;
    return this.http.get<Property[]>(url, {headers: header});
  }
}
