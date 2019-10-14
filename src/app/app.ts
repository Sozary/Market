import {
  Component,
  OnInit
} from '@angular/core';
import product_s from "./../assets/products_s.json"
import product_f from "./../assets/products_f.json"
import Customer from './classes/Customer.js';
import {
  IProduct,
  ProductManager
} from './classes/Product.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  product_manager: ProductManager
  customer: Customer

  get products(): IProduct[] {
    return this.product_manager.getNearestProducts(this.customer, 10)
  }
  get floats(): IProduct[] {
    return this.product_manager.getNearestProducts(this.customer, 10, true)
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
