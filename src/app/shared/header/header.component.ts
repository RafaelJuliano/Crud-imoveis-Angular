import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public title = 'CRUD de cadastro de imóveis com Angular 11';

  constructor(private sharedService: SharedService) { }
  
  logout(){
    this.sharedService.cleanCokie();
  }

}
