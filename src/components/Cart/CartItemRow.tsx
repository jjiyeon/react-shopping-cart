import { useContext } from 'react'
import { CartItem, CartContext, UpdateCartContext } from '../../context/cartsContext'
import Checkbox from '../common/Checkbox'

import TrashIcon from '../../assets/svgs/trash.svg?react'
import { fomattingComma } from '../../util/formatter'

enum Calc {
  plus,
  minus,
}
const CartItemRow = () => {
  const myCarts = useContext(CartContext)
  const updateCart = useContext(UpdateCartContext)

  const { cart } = myCarts

  const handleCheckboxChange = (id: number) => {
    updateCart({
      ...myCarts,
      cart: myCarts.cart.map((item) => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked }
        }
        return item
      }),
    })
  }
  const handleRemoveItem = (param: CartItem) => {
    if (window.confirm('상품을 삭제하시겠어요?')) {
      updateCart({ ...myCarts, cart: cart.filter((item) => item.id !== param.id) })
    }
  }
  const updateItemQuantity = (item: CartItem, type: Calc) => {
    const newItems: Array<CartItem> = []

    if (type === Calc.plus) {
      newItems.push(
        ...cart.map((inItem) => {
          if (inItem.id === item.id) return { ...inItem, quantity: (inItem.quantity += 1) }
          return inItem
        })
      )
    } else {
      newItems.push(
        ...cart.map((inItem) => {
          if (inItem.id === item.id) return { ...inItem, quantity: (inItem.quantity -= 1) }
          return inItem
        })
      )
    }

    updateCart({
      ...myCarts,
      cart: newItems,
    })
  }

  return (
    <>
      {myCarts.cart.map((item, _) => (
        <div className="cart-container" key={item.id}>
          <div className="flex gap-15 mt-10">
            <Checkbox
              id={String(item.id)}
              checked={item.isChecked ?? false}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <img className="w-144 h-144" src={item.imageUrl} alt={item.name} />
            <span className="cart-name">{item.name}</span>
          </div>
          <div className="flex-col-center justify-end gap-15">
            <button type="button" onClick={() => handleRemoveItem(item)}>
              <TrashIcon />
            </button>
            <div className="number-input-container">
              <input type="number" className="number-input" value={item.quantity} readOnly />
              <div>
                <button
                  type="button"
                  className="number-input-button"
                  onClick={() => {
                    if (item.quantity < 20) {
                      updateItemQuantity(item, Calc.plus)
                    }
                  }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="number-input-button"
                  onClick={() => {
                    if (item.quantity > 1) {
                      updateItemQuantity(item, Calc.minus)
                    }
                  }}
                >
                  ▼
                </button>
              </div>
            </div>
            <span className="cart-price">{fomattingComma(item.price * item.quantity)}원</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItemRow
