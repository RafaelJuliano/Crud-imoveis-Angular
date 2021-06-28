import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getCookie(cname: string): string {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setCookie(result: any): void {
    document.cookie = `token=${result.token}`;
    document.cookie = `id=${result.id}`
    document.cookie = ` email=${result.email}`
  }

  cleanCokie():void{
    document.cookie = `token=""`;
    document.cookie = `id=""`
    document.cookie = ` email=""`
  }
}
