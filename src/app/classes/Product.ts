import Customer from "./Customer";

export type DistanceType = {
  distance: number
  product: IProduct
}
export interface IProduct {
  name: string
  price: number

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
  products.forEach(product => {
    Object.keys(res).forEach(k => {
      res[k] /= 7
    })
  })
  return res
}

export class ProductManager {
  public products: IProduct[]
  constructor(products ? : IProduct[]) {

    this.products = products ? products : []
  }

  public addProduct(product: IProduct) {
    this.products.push(product)
  }

  public getNearestProducts(customer: Customer, limit: number = 10) {
    if (customer.point === undefined)
      return this.products.slice(0, limit)
    return this.getDistanceMap(customer.point).map(distance => {
      return distance.product
    }).slice(0, limit)
  }
  private getDistanceMap(point_a: IPoint): Array < DistanceType > {
    let distances: Array < DistanceType > = []

    this.products.forEach(product => {
      distances.push({
        distance: this.getDistance(point_a, product.point),
        product: product
      })
    })
    for (let i = 0; i < distances.length; i++) {
      for (let j = i; j < distances.length; j++) {
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
    return Math.sqrt(
      Math.pow(point_a.homme - point_b.homme, 2) +
      Math.pow(point_a.femme - point_b.femme, 2) +
      Math.pow(point_a.csp_moins - point_b.csp_moins, 2) +
      Math.pow(point_a.csp_plus - point_b.csp_plus, 2) +
      Math.pow(point_a.moins_25 - point_b.moins_25, 2) +
      Math.pow(point_a.moins_50 - point_b.moins_50, 2) +
      Math.pow(point_a.plus_50 - point_b.plus_50, 2))
  }


}
