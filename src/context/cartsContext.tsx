import { createContext, useState } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
}
export interface Order {
  id: number
  orderDetails: Array<Product & { quantity: number }>
}

export interface CartItem extends Product {
  quantity: number
  isChecked?: boolean
}
export interface MyOrder {
  cart: Array<CartItem>
  order: Array<CartItem>
  orderHistory: Array<Order>
}
export const CartContext = createContext<MyOrder>({ cart: [], order: [], orderHistory: [] })
export const UpdateCartContext = createContext<(payload: MyOrder) => void>(() => {})

const CartsProvider = ({ children }: { children: React.ReactNode }) => {
  const [myOrder, setMyOrder] = useState<MyOrder>({ cart: [], order: [], orderHistory: [] })

  return (
    <>
      <UpdateCartContext.Provider value={setMyOrder}>
        <CartContext.Provider value={myOrder}>{children}</CartContext.Provider>
      </UpdateCartContext.Provider>
    </>
  )
}

export default CartsProvider
