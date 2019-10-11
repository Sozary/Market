import {
  IPoint,
  IProduct,
  computeBarycenter
} from "./Product";

export default class Customer {
  public point: IPoint
  public featured: IProduct[]

  constructor() {
    this.featured = []
  }
  public update(product: IProduct) {

    this.featured.push(product)
    if (this.point)
      this.point = computeBarycenter(this.featured)
    else
      this.point = product.point
  }

}
