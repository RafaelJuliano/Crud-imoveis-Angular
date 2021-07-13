import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Property, PropertyList } from '../interfaces/property';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getProperties(page: number = 0, limit: number = 20): Observable<PropertyList> {
    const token: string = this.sharedService.getCookie('token');
    const header: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + token })
    const url: string = `${environment.apiUrl}/imoveis/?page=${page}&limit=${limit}`;
    return this.http.get<PropertyList>(url, {headers: header});
  }

  addProperty(property: Property): Observable<Property> {
    const token: string = this.sharedService.getCookie('token');
    const header: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + token });
    const url: string = `${environment.apiUrl}/imoveis`;
    return this.http.post<Property>(url, property,{headers: header});
  }

}
