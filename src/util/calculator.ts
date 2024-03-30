import { CartItem } from '../context/cartsContext'

export const estimatedPrice = (param: { item: Array<CartItem> }) => {
  return param.item.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
}
export const CheckeditemCount = (param: { item: Array<CartItem> }) => {
  return param.item.filter((item) => item.isChecked)
}
