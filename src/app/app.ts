import {
  Component,
  OnInit
} from '@angular/core';
import product_s from "../assets/products_s"
import product_f from "../assets/products_f"
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
export class AppComponent {
  public risk: boolean = false
  public product_manager: ProductManager
  public customer: Customer
  public dom_ready: boolean = false
  private product_limit: number = 10

  get numberClickedProduct(): number {
    return this.customer.featured.length
  }
  get floats(): IProduct[] {
    return this.product_manager.getNearestProducts(this.customer, this.product_limit, true).map(e => {
      if (e.point)
        Object.keys(e.point).forEach(k => Math.round(e.point[k]))
      return e
    })
  }

  get products(): IProduct[] {
    return this.product_manager.getNearestProducts(this.customer, this.product_limit)
  }

  get fav_product(): IProduct {
    return this.product_manager.getNearestProducts(this.customer, this.product_limit)[0]
  }

  public selectProduct(product): void {
    this.customer.update(product)
  }
  public selectFloatProduct(product): void {
    this.customer.updateFloat(product)
  }
  constructor() {
    this.product_manager = new ProductManager()
    this.customer = new Customer(this.product_manager)

    for (let element of product_f.data)
      this.product_manager.addFloatProduct({
        name: element.name,
        price: element.price,
        src: element.src,
        point: undefined
      })

    for (let element of product_s.data)
      this.product_manager.addProduct({
        name: element.name,
        price: element.price,
        src: element.src,
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
    this.dom_ready = true


  }

}
