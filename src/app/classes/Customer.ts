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
    this.point = computeBarycenter(this.featured)
  }

}
