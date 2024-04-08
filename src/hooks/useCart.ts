import { useContext, useMemo } from 'react'
import { CartContext, CartItem, Order, UpdateCartContext } from '../context/cartsContext'

type Action = 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM' | 'ADD_ORDER_ITEM' | 'UPDATE_ITEM_QUANTITY'

const useCart = () => {
  const orderContext = useContext(CartContext)
  const updateCartContext = useContext(UpdateCartContext)

  const actions = (action: Action, state?: Order['orderDetails']) => {
    switch (action) {
      case 'ADD_CART_ITEM':
        return state && updateCartContext({ ...orderContext, cart: [...orderContext.cart, ...state] })

      case 'ADD_ORDER_ITEM':
        return updateCartContext({
          ...orderContext,
          order: orderContext.cart.filter((item) => item.isChecked),
        })
      case 'REMOVE_CART_ITEM':
        return updateCartContext({
          ...orderContext,
          cart: orderContext.cart.filter((item) => !item.isChecked),
        })
      case 'UPDATE_ITEM_QUANTITY':
        return (
          state &&
          updateCartContext({
            ...orderContext,
            cart: [...orderContext.cart, ...state],
          })
        )

      default:
        throw new Error('Unhandled action type')
    }
  }
  return {
    orderContext,
    actions,
  }
}

export default useCart
