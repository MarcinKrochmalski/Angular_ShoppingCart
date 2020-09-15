import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../servises/http.service';
import { DeliveryModel } from '../../models/delivery.model'
import { PopupDataModel } from '../../models/popup-data.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styles: []
})
export class DeliveryComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  @Input() active: boolean;
  @Input() texts: any;
  @Input() toPay: number;
  @Output() IsLoadedEmitter = new EventEmitter<any>();
  @Output() StepEmitter = new EventEmitter<number>();
  @Output() PopupEmitter = new EventEmitter<PopupDataModel>();
  @Output() DeliveriesEmitter = new EventEmitter<DeliveryModel[]>();
  deliveries: DeliveryModel[];

  private getDeliveries(): void {

    this.httpService.getDeliveries().subscribe(
      response => {

        let dataIsOk = true;
        response.forEach(delivery => {

          if (
            typeof delivery.id === 'undefined' ||
            typeof delivery.name === 'undefined' ||
            typeof delivery.price === 'undefined'
          )
            return dataIsOk = false;

        });

        if (dataIsOk) {

          this.deliveries = response.map((delivery, index) => {
            delivery.select = (index === 0) ? true : false;
            return delivery
          });
          this.IsLoadedEmitter.emit();
          this.DeliveriesEmitter.emit(this.deliveries);

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

  handleSelect(id: number): void {

    this.deliveries.map(delivery => {
      delivery.select = delivery.id === id ? true : false;
      return delivery
    })
    this.DeliveriesEmitter.emit(this.deliveries);

  }

  popup(data: PopupDataModel): void {

    this.PopupEmitter.emit(data);

  }

  switchSteps(step: number): void {

    this.StepEmitter.emit(step);

  }


  ngOnInit(): void {

    this.getDeliveries();

  }

}
