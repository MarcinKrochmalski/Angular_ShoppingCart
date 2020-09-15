import { Component, Output, Input, EventEmitter } from '@angular/core';
import { DeliveryModel } from '../../../models/delivery.model';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styles: []
})
export class OptionComponent {

  @Input() texts: any;
  @Input() optionData: DeliveryModel;
  @Output() selectEmitter = new EventEmitter<number>();

  select(id: number): void {
    this.selectEmitter.emit(id);
  }

}
