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
  AppComponent
} from './app'
import {
  ProductComponent
} from './components/product/product';

@NgModule({
  declarations: [AppComponent, ProductComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
