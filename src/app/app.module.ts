import {
  BrowserModule
} from '@angular/platform-browser'
import {
  NgModule
} from '@angular/core'
import {
  FormsModule
} from "@angular/forms";

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
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}
