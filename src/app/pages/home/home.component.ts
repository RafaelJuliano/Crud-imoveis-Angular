import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/interfaces/property';
import { Router } from '@angular/router';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(ErrorMsgComponent) errorMsgComponent!: ErrorMsgComponent;
  public load: boolean = false;
  public properties: Property[] = [];

  constructor(private propertyService: PropertyService, private router: Router) {}
     

  ngOnInit(): void {   
    console.log(`init: ${this.errorMsgComponent}`)  
    this.getProperties();   
  }

  getProperties(): void {
    this.load = true;
    this.propertyService.getProperties()
      .subscribe(
        (result) => {
          this.properties = result;
        },
        (error) => {
          if (error.status == 401) {
            this.load = false;
            this.errorMsgComponent.setError('Autenticação expirou, faça login novamente');
            setTimeout(() => { this.router.navigateByUrl('/login'); }, 2500);
          } else if (error.status === 404) {
            this.load = false;
          } else {
            this.errorMsgComponent.setError('Erro inesperado ao listar imóveis');
          }
        }
      );
  }
}
