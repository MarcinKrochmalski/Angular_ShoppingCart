import { MainDataModel } from '../models/main-data.model';

export const MainDataConfig: MainDataModel = {

    isLoaded: false,
    header: {
        step: 0
    },

    preload: {
        active: true
    },

    popup: {
        active: false,
        message: "",
        activeButton: true
    },

    list: {
        active: false
    },

    delivery: {
        active: false
    },

    form: {
        active: false
    },
    final: {
        listPrice: 0,
        deliveryPrice: 0,
        toPay: 0
    }

}