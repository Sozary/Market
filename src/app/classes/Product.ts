export default interface IProduct {
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
