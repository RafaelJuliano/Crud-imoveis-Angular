import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { PropertyService } from 'src/app/services/property.service';
import { SharedService } from 'src/app/services/shared.service';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent {
  @ViewChild(ErrorMsgComponent) errorMsgComponent!: ErrorMsgComponent;
  public property: Property = {} as Property;
  public title: string = 'Editar imóvel';
  public load: boolean = false;

  constructor(private propertyService: PropertyService, private activatedRoute: ActivatedRoute, private router: Router, private sharedService: SharedService) {
    this.getProperty(this.activatedRoute.snapshot.params.id);
  }

  getProperty(id: number) {
    this.load = true;
    this.propertyService.getProperty(id).subscribe(
      (result) => {
        this.load = false
        this.property = result;
      },
      (error) => {
        if (error.status == 401) {
          this.load = false;
          this.errorMsgComponent.setError('Autenticação expirou, faça login novamente');
          this.sharedService.cleanCokie();
          setTimeout(() => { this.router.navigateByUrl('/login'); }, 2500);
        } else {
          this.load = false;
          this.errorMsgComponent.setError('Erro inesperado ao buscar imóvel');
          setTimeout(() => { this.router.navigateByUrl('/'); }, 2500);
        }
      }
    );
  }

  updateProperty(property: Property) {
    this.load = true;
    this.propertyService.updateProperty(property).subscribe(
      (result) => {
        this.load = false;
        this.errorMsgComponent.setSuccess('Imóvel atualizado com sucesso');
      },
      (error) => {
        if (error.status == 401) {
          this.load = false;
          this.errorMsgComponent.setError('Autenticação expirou, faça login novamente');
          this.sharedService.cleanCokie();
          setTimeout(() => { this.router.navigateByUrl('/login'); }, 2500);
        } else {
          this.load = false;
          this.errorMsgComponent.setError('Erro inesperado ao atualziar imóvel');
        }
      }
    )
  }

  deleteProperty() {
    let clientCofirm: boolean = confirm("Tem certeza que deseja deletar o imóvel?");
    if (clientCofirm) {
      this.load = true;
      this.propertyService.deleteProperty(this.activatedRoute.snapshot.params.id).subscribe(
        (result) => {
          this.load = false;
          this.errorMsgComponent.setSuccess('Imóvel deletado com sucesso');
          setTimeout(() => { this.router.navigateByUrl('/'); }, 2500);
        },
        (error) => {
          if (error.status == 401) {
            this.load = false;
            this.errorMsgComponent.setError('Autenticação expirou, faça login novamente');
            this.sharedService.cleanCokie();
            setTimeout(() => { this.router.navigateByUrl('/login'); }, 2500);
          } else {
            this.load = false;
            this.errorMsgComponent.setError('Erro inesperado ao deletar imóvel');
          }
        }
      )
    }
  }
}
