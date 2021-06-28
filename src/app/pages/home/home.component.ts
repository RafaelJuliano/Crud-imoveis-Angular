import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { SharedService } from 'src/app/services/shared.service';
import { Property } from 'src/app/interfaces/property';
import { Router } from '@angular/router';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild(ErrorMsgComponent) errorMsgComponent!: ErrorMsgComponent;
  public load: boolean = false;
  public propertiesCount!: Number;
  public properties: Property[] = [];
  public page: number = 0;
  private limit: number = 9;

  constructor(private propertyService: PropertyService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    const token = this.sharedService.getCookie("token");
    if (token.length !== 191){
      this.router.navigateByUrl('/login')
    }
  }

  ngAfterViewInit(): void {
    this.getProperties();
  }


  getProperties(): void {
    this.load = true;
    this.propertyService.getProperties(this.page, this.limit)
      .subscribe(
        (result) => {
          this.propertiesCount = result.count;          
          this.properties = result.propertiesFound;
        },
        (error) => {
          if (error.status == 401) {
            this.load = false;
            this.errorMsgComponent.setError('Autenticação expirou, faça login novamente');
            this.sharedService.cleanCokie();
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
