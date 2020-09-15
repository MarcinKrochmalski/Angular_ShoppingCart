
import { Component, OnInit } from '@angular/core';
import { HttpService } from './servises/http.service';
import { ProductModel } from './models/product.model';
import { DeliveryModel } from './models/delivery.model';
import { TextsModel } from './models/texts.model';
import { PopupDataModel } from 'src/app/models/popup-data.model';
import { MainDataConfig } from './config/main-data.config';
import { DefaultTextsConfig } from './config/default-texts.config';


@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})


export class AppComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  mainData = MainDataConfig;
  texts: TextsModel;
  defaultTexts = DefaultTextsConfig;
  dataLoaded: number = 0;

  private getTexts(): void {

    this.httpService.getTexts().subscribe(
      response => {
        this.texts = response;
        this.dataIsLoaded();
        this.mainData.isLoaded = true;
      },
      error => {
        this.handlePopup(true, error, false);
      }
    )

  }

  dataIsLoaded(): void {

    this.dataLoaded++;
    if (this.dataLoaded === 3) {
      this.switchSteps(1);
      setTimeout(() => this.handlePreload(false), 1000);
    }

  }

  switchSteps(step: number): void {

    this.mainData.header.step = step;
    ['list', 'delivery', 'form'].forEach((name, index) => {
      this.mainData[name].active = (index + 1) === step ? true : false;
    });

  }

  popup(data: PopupDataModel): void {

    const { active, message, activeButton } = data;
    this.handlePopup(active, message, activeButton);

  }


  handlePopup(active = false, message = "", activeButton = true): void {

    if (message.length === 0) active = false;
    this.mainData.popup = {
      active,
      message,
      activeButton
    }

  }

  handlePreload(active = false): void {

    this.mainData.preload = { active }

  }

  setProductsToFinal(products: ProductModel[]): void {

    if (products.length > 0) {
      this.mainData.final.listPrice = 0;

      this.mainData.final.list = products.map((product: ProductModel) => {
        this.mainData.final.listPrice += product.price * product.quantity;
        return {
          id: product.id,
          quantity: product.quantity
        }
      })

      this.mainData.final.toPay = this.mainData.final.listPrice + this.mainData.final.deliveryPrice;

    } else {

      this.switchSteps(0);
      this.handlePopup(true, this.texts?.final?.messages?.errors?.empty, false)

    }

  }

  setDeliveriesToFinal(deliveries: DeliveryModel[]): void {

    const index = deliveries.findIndex(delivery => delivery.select)
    this.mainData.final.delivery = deliveries[index]
    this.mainData.final.deliveryPrice = this.mainData.final.delivery.price
    this.mainData.final.toPay = this.mainData.final.listPrice + this.mainData.final.deliveryPrice

  }

  saveData(form: {}) {

    let data = new FormData()
    data.append("form", JSON.stringify(form))
    data.append("list", JSON.stringify(this.mainData.final.list))
    data.append("delivery", JSON.stringify(this.mainData.final.delivery))

    this.httpService.saveData(data).subscribe(
      response => {
        this.handlePopup(true, response, false);
      },
      () => {//error
        this.handlePopup(true, this.texts?.form?.messages?.errors?.send, true);
      }
    )
  }

  ngOnInit(): void {

    this.getTexts()

  }

}
