import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TextsModel } from '../models/texts.model';
import { ProductModel } from '../models/product.model';
import { DeliveryModel } from '../models/delivery.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient) { }

  timestamp(): number {
    return new Date().valueOf();

  }

  getTexts(): Observable<TextsModel> {

    return this.httpClient
      .get<TextsModel>('https://marcinkrochmalski.github.io/json/texts_2.json?timestam=' + this.timestamp())
      .pipe(
        map(response => response),
        catchError(this.handleError)
      )

  }

  getProducts(): Observable<ProductModel[]> {

    return this.httpClient
      .get<ProductModel[]>('https://marcinkrochmalski.github.io/json/products.json?timestam=' + this.timestamp())
      .pipe(
        map(response => response),
        catchError(this.handleError)
      )

  }

  getDeliveries(): Observable<DeliveryModel[]> {

    return this.httpClient
      .get<DeliveryModel[]>('https://marcinkrochmalski.github.io/json/deliveries.json?timestam=' + this.timestamp())
      .pipe(
        map(response => response),
        catchError(this.handleError)
      )

  }

  saveData(data: FormData): Observable<any> {

    return this.httpClient
      .post<any>('/save', data)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      )

  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    console.error(
      `Name: ${error.name} \n` +
      `Message: ${error.message} \n` +
      `Returned code: ${error.status} \n`
    );
    return throwError('Error, please try again later.');

  }

}
