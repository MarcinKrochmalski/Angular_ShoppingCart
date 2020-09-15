import { BrowserModule } from '@angular/platform-browser';

import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PreloadComponent } from './components/preload/preload.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { FormComponent } from './components/form/form.component';
import { ProductComponent } from './components/list/product/product.component';
import { PopupComponent } from './components/popup/popup.component';
import { OptionComponent } from './components/delivery/option/option.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    PreloadComponent,
    FooterComponent,
    HeaderComponent,
    ListComponent,
    DeliveryComponent,
    FormComponent,
    ProductComponent,
    PopupComponent,
    OptionComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl-PL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
