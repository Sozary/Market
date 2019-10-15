import Customer from "./Customer";
import Images from "./Images";
export type DistanceType = {
  distance: number
  product: IProduct
}
export interface IProduct {
  name: string
  price: number
  src: string

  point: IPoint

}
export interface IPoint {
  homme: number
  femme: number
  csp_plus: number
  csp_moins: number
  moins_25: number
  moins_50: number
  plus_50: number
}

export function computeBarycenter(products: IProduct[]): IPoint {
  let res = {
    homme: 0,
    femme: 0,
    csp_moins: 0,
    csp_plus: 0,
    moins_25: 0,
    moins_50: 0,
    plus_50: 0
  }
  products.forEach(product => {
    Object.keys(res).forEach(k => {
      res[k] += product.point[k]
    })
  })

  Object.keys(res).forEach(k => {
    res[k] /= products.length
  })
  return res
}

export class ProductManager {
  public products: IProduct[]

  public floats: IProduct[]
  constructor(products ? : IProduct[], floats ? : IProduct[]) {
    this.products = products ? products : []
    this.floats = floats ? floats : []
  }

  public addProduct(product: IProduct) {
    this.products.push(product)
  }
  public isFloat(name: string): boolean {
    return this.floats.filter(f => f.name == name).length > 0
  }
  public updateFloat(product: IProduct, customer_point: IPoint) {
    product.point = customer_point
  }
  public addFloatProduct(float: IProduct) {
    this.floats.push(float)
  }

  public getNearestProducts(customer: Customer, limit: number = 10, is_float: boolean = false) {
    if (customer.point === undefined)
      return (is_float ? this.floats : this.products).slice(0, limit)
    return this.getDistanceMap(customer.point, is_float).map(distance => {
      return distance.product
    }).slice(0, limit)
  }
  private getDistanceMap(point_a: IPoint, floating: boolean = false): Array < DistanceType > {
    let distances: Array < DistanceType > = []
    let data = floating ? this.floats : this.products

    data.forEach(product => {
      distances.push({
        distance: this.getDistance(point_a, product.point),
        product: product
      })
    })
    for (let i = 0; i < distances.length; i++) {
      for (let j = i; j < distances.length; j++) {
        if (distances[i] && distances[j])
          if (distances[i].distance > distances[j].distance) {
            let tmp = distances[j]
            distances[j] = distances[i]
            distances[i] = tmp
          }
      }
    }
    return distances
  }

  private getDistance(point_a: IPoint, point_b: IPoint): number {
    if (point_a && point_b)
      return Math.sqrt(
        Math.pow(point_a.homme - point_b.homme, 2) +
        Math.pow(point_a.femme - point_b.femme, 2) +
        Math.pow(point_a.csp_moins - point_b.csp_moins, 2) +
        Math.pow(point_a.csp_plus - point_b.csp_plus, 2) +
        Math.pow(point_a.moins_25 - point_b.moins_25, 2) +
        Math.pow(point_a.moins_50 - point_b.moins_50, 2) +
        Math.pow(point_a.plus_50 - point_b.plus_50, 2))
    return undefined
  }


}
