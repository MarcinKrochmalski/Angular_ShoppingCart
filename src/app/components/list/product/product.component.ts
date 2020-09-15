import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { ProductQuantit } from '../../../models/product-quantit.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent {

  @Input() texts: any;
  @Input() productData: ProductModel;
  @Output() ChangeEmitter = new EventEmitter<ProductQuantit>();
  @Output() ValidationEmitter = new EventEmitter<number>();
  @Output() DeleteEmitter = new EventEmitter<number>();

  change(id: number, action: string = "+", quantity: number = 1): void {

    const data: ProductQuantit = { id, action, quantity };
    this.ChangeEmitter.emit(data);

  }

  validation(id: number): void {

    this.ValidationEmitter.emit(id);

  }

  delete(id: number): void {

    this.DeleteEmitter.emit(id);

  }

}
