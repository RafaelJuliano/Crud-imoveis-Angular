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

  getProperty(id: number): Observable<Property>{
    const token: string = this.sharedService.getCookie('token');
    const header: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + token })
    const url: string = `${environment.apiUrl}/imoveis/${id}`;
    return this.http.get<Property>(url, {headers: header});
  }

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

  updateProperty(property: Property): Observable<Property>{
    const token: string = this.sharedService.getCookie('token');
    const header: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + token });
    const url: string = `${environment.apiUrl}/imoveis/${property.id}`;
    return this.http.patch<Property>(url, property,{headers: header});
  }

  deleteProperty(id: number): Observable<Property>{
    const token: string = this.sharedService.getCookie('token');
    const header: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + token });
    const url: string = `${environment.apiUrl}/imoveis/${id}`;
    return this.http.delete<Property>(url, {headers: header});
  }
}
