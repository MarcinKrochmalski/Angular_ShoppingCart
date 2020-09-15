import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../servises/http.service';
import { ProductModel } from '../../models/product.model';
import { ProductQuantit } from 'src/app/models/product-quantit.model';
import { PopupDataModel } from 'src/app/models/popup-data.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})

export class ListComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  @Input() active: boolean;
  @Input() texts: any;
  @Input() listPrice: number;
  @Output() IsLoadedEmitter = new EventEmitter<any>();
  @Output() StepEmitter = new EventEmitter<number>();
  @Output() PopupEmitter = new EventEmitter<PopupDataModel>();
  @Output() ProductsEmitter = new EventEmitter<ProductModel[]>();
  products: ProductModel[];

  private getProducts(): void {

    this.httpService.getProducts().subscribe(
      response => {

        let dataIsOk = true;
        response.forEach(product => {

          if (
            typeof product.id === 'undefined' ||
            typeof product.name === 'undefined' ||
            typeof product.price === 'undefined' ||
            typeof product.quantity === 'undefined' ||
            typeof product.maxQuantity === 'undefined'
          )
            return dataIsOk = false;

        });

        if (dataIsOk) {

          this.products = response;
          this.IsLoadedEmitter.emit();
          this.ProductsEmitter.emit(response);

        } else {

          this.PopupEmitter.emit({
            active: true,
            message: this.texts?.messages?.errors?.fetchData,
            activeButton: false
          });

        }


      },
      () => {//error
        this.PopupEmitter.emit({
          active: true,
          message: this.texts?.messages?.errors?.fetchData,
          activeButton: false
        });
      }
    )

  }

  change(data: ProductQuantit): void {

    const { id, action, quantity } = data;

    const index = this.products.findIndex((product) => product.id === id)

    if (action === "+") this.products[index].quantity++
    else if (action === "-") this.products[index].quantity--
    else this.products[index].quantity = Math.round(quantity)

  }

  validation(id: number): void {

    const index = this.products.findIndex((product) => product.id === id);

    if (this.products[index].quantity < 1) {

      this.products[index].quantity = 1
      this.PopupEmitter.emit({
        active: true,
        message: this.texts?.messages?.errors?.quantity,
        activeButton: true
      })

    }

    if (this.products[index].quantity > this.products[index].maxQuantity) {

      this.products[index].quantity = this.products[index].maxQuantity
      this.PopupEmitter.emit({
        active: true,
        message: this.texts?.messages?.errors?.maxQuantity + " " + this.products[index].maxQuantity,
        activeButton: true
      })

    }

    this.ProductsEmitter.emit(this.products);

  }

  delete(id: number): void {

    const index = this.products.findIndex((product) => product.id === id)
    this.products.splice(index, 1)
    this.ProductsEmitter.emit(this.products);

  }

  switchSteps(step: number): void {

    this.StepEmitter.emit(step);

  }

  ngOnInit(): void {

    this.getProducts()

  }

}
