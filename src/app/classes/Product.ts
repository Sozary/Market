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
  public updateProductIfFloat(product: IProduct, customer_point: IPoint): boolean {
    let res = this.floats.filter(float => float.name === product.name)
    if (res.length > 0) {
      res[0].point = customer_point
      return true
    }
    return false
  }
  public addFloatProduct(float: IProduct) {
    this.floats.push(float)
  }

  public getNearestProducts(customer: Customer, limit: number = 10) {

    if (customer.point === undefined)
      return this.insertFloats(this.products.slice(0, limit), customer)
    return this.insertFloats(this.getDistanceMap(customer.point).map(distance => {
      return distance.product
    }).slice(0, limit), customer)
  }

  public insertFloats(products: IProduct[], customer: Customer): IProduct[] {
    let res: IProduct[] = []

    let number_to_insert = Math.floor(Math.random() * products.length / 2.5) + 1;
    let number_to_insert_index = 0
    let product_index = 0
    let float_distances = this.getDistanceMap(customer.point, true)
    let defined_distance = float_distances.filter(f => f.distance != undefined)
    if (defined_distance.length === 0) {
      float_distances = this.mixFloats(float_distances)
    }

    for (let i = 0; i < products.length; i++) {
      if (Math.random() > .3 && number_to_insert_index < number_to_insert) {
        res.push(float_distances[number_to_insert_index++].product)
        number_to_insert--
      } else {
        res.push(products[product_index++])
      }
    }

    return res
  }
  mixFloats(float_distances: DistanceType[]): DistanceType[] {
    var currentIndex = float_distances.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = float_distances[currentIndex];
      float_distances[currentIndex] = float_distances[randomIndex];
      float_distances[randomIndex] = temporaryValue;
    }
    return float_distances
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
