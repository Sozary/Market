import {
  Component,
  OnInit
} from '@angular/core';
import * as products_s from "./../assets/products_s.json"
import Customer from './Customer.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: IProduct[]
  customer: Customer
  constructor() {
    this.products = []
    products_s.default.data.forEach(element => {
      this.products.push({
        name: element.name,
        price: element.price,
        homme: element.profiling.homme,
        femme: element.profiling.femme,
        csp_plus: element.profiling.csp_plus,
        csp_moins: element.profiling.csp_moins,
        moins_25: element.profiling.moins_25,
        moins_50: element.profiling.moins_50,
        plus_50: element.profiling.plus_50,
      })
    });
  }

  public selectProduct(product): void {
    console.log(product);
  }
  ngOnInit() {

  }
}

export interface IProduct {
  name: String
  price: Number
  homme: Number
  femme: Number
  csp_plus: Number
  csp_moins: Number
  moins_25: Number
  moins_50: Number
  plus_50: Number
}
