import IProduct, {
  IPoint,
  computeBarycenter
} from "./Product";

export default class Customer {
  public point: IPoint
  public featured: IProduct[]

  public update(product: IProduct) {
    this.featured.push(product)
    this.point = computeBarycenter(this.featured)
    console.log(this.point.homme);
  }

}
