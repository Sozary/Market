import {
  Component,
  OnInit
} from '@angular/core';
import * as products_s from "./../assets/products_s.json"
import Customer from './classes/Customer.js';
import
IProduct
from './classes/Product.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  products: IProduct[]
  customer: Customer
  constructor() {
    this.products = []
    this.customer = new Customer()

    products_s.default.data.forEach(element => {
      this.products.push({
        name: element.name,
        price: element.price,
        point: {
          homme: element.profiling.homme,
          femme: element.profiling.femme,
          csp_plus: element.profiling.csp_plus,
          csp_moins: element.profiling.csp_moins,
          moins_25: element.profiling.moins_25,
          moins_50: element.profiling.moins_50,
          plus_50: element.profiling.plus_50,
        }
      })
    });
  }

  public selectProduct(product): void {
    this.customer.update(product)
  }
  ngOnInit() {

  }
}
