import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent {  
  @Input() property: Property = {} as Property;  
  @Input() title!: string;
  @Input() isANewProperty: boolean = false;
  @Output() outputProperty: EventEmitter<Property> = new EventEmitter();
  @Output() deleteProperty: EventEmitter<Boolean> = new EventEmitter();

  onSubmit(): void {
    this.outputProperty.emit(this.property);
  }

  emitDeleteProperty(){
    this.deleteProperty.emit()
  }
}
