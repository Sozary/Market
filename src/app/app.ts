import {
  Component,
  OnInit
} from '@angular/core';
import * as product_s from "./../assets/products_s.json"
import * as product_f from "./../assets/products_f.json"
import Customer from './classes/Customer.js';
import {
  IProduct,
  ProductManager
} from './classes/Product.js';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  animations: [
    trigger("products", [
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate('.5s ease-out', style({
          opacity: '1'
        })),
      ]),
    ])

  ]
})
export class AppComponent implements OnInit {
  product_manager: ProductManager
  customer: Customer

  get products(): IProduct[] {
    return this.product_manager.getNearestProducts(this.customer, 10).map(p => {
      return {
        ...p,
        float: this.product_manager.isFloat(p.name)
      }
    })
  }

  get fav_product(): IProduct {
    return this.product_manager.getNearestProducts(this.customer, 10).map(p => {
      return {
        ...p,
        float: this.product_manager.isFloat(p.name)
      }
    }).filter(e => !e.float)[0]
  }

  public selectProduct(product): void {
    this.customer.update(product)
  }
  ngOnInit() {
    this.product_manager = new ProductManager()
    this.customer = new Customer(this.product_manager)

    product_f.data.forEach(element => {
      this.product_manager.addFloatProduct({
        name: element.name,
        price: element.price,
        point: undefined
      })
    })

    product_s.data.forEach(element => {
      this.product_manager.addProduct({
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
}
