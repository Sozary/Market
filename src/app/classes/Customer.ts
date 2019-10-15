import {
  IPoint,
  IProduct,
  computeBarycenter,
  ProductManager
} from "./Product";

export default class Customer {
  public point: IPoint
  public featured: IProduct[]

  public product_manager_ctxt: ProductManager

  constructor(product_manager_ctxt: ProductManager) {
    this.product_manager_ctxt = product_manager_ctxt
    this.featured = []
  }
  public update(product: IProduct) {
    this.featured.push(product)
    if (this.point)
      this.point = computeBarycenter(this.featured)
    else
      this.point = product.point
  }
  public updateFloat(product: IProduct) {
    this.product_manager_ctxt.updateFloat(product, this.point)
  }
}
