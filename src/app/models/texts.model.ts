export interface TextsModel {
    header: {
        title: string;
    },
    popup: {
        buttons: {
            close: string;
        }
    },
    list: {
        title: string;
        listPrice: string;
        price: string;
        currency: string;
        quantity: number;
        buttons: {
            next: string;
            delete: string;
        },
        messages: {
            errors: {
                fetchData: string;
                quantity: string;
                maxQuantity: string;
            }
        }
    },
    delivery: {
        title: string;
        toPay: string;
        price: string;
        currency: string;
        buttons: {
            back: string;
            next: string;
            select: string;
        },
        messages: {
            errors: {
                fetchData: string;
            }
        }
    },
    form: {
        title: string;
        toPay: string;
        currency: string;
        labels: {
            firstname: string;
            lastname: string;
            email: string;
            phone: string;
            street: string;
            city: string;
            country: string;
            zipCode: string;
            accept: string;
        },
        buttons: {
            send: string;
            back: string;
        },
        messages: {
            errors: {
                firstname: string;
                lastname: string;
                email: string;
                phone: string;
                street: string;
                city: string;
                country: string;
                zipCode: string;
                accept: string;
                incorrect: string;
                send: string;
            }
        }
    },
    final: {
        messages: {
            errors: {
                empty: string;
            }
        }
    }
}