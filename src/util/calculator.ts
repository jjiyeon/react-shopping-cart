import { CartItem } from '../context/cartsContext'

export const sumPrice = (param: { item: Array<CartItem> }) => {
  return param.item.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
}
export const checkedItemCount = (param: { item: Array<CartItem> }) => {
  return param.item.filter((item) => item.isChecked)
}
