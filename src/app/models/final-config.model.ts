import { FinalProductModel } from './final-product.model';
import { DeliveryModel } from './delivery.model';

export interface FinalConfigModel {
    list?: FinalProductModel[];
    delivery?: DeliveryModel;
    listPrice: number;
    deliveryPrice: number;
    toPay: number;
}