import {
  BrowserModule
} from '@angular/platform-browser'
import {
  NgModule
} from '@angular/core'

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  Product
} from "./components/product/product"

import {
  AppComponent
} from './app.component'

@NgModule({
  declarations: [AppComponent, Product],
  imports: [BrowserModule, BrowserAnimationsModule, ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
