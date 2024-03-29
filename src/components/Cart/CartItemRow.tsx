import { useContext } from 'react'
import { CartItem, CartContext, UpdateCartContext } from '../../context/cartsContext'
import Checkbox from '../common/Checkbox'

import TrashIcon from '../../assets/svgs/trash.svg?react'

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
          item.isChecked = !item.isChecked
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
    let newItems: Array<CartItem> = []

    if (type === Calc.plus) {
      newItems = cart.map((inItem) => {
        if (inItem.id === item.id) inItem.quantity = inItem.quantity += 1 //return { ...inItem, quantity: ++inItem.quantity }
        return inItem
      })
    } else {
      newItems = cart.map((inItem) => {
        if (inItem.id === item.id) inItem.quantity = inItem.quantity -= 1 //return { ...inItem, quantity: ++inItem.quantity }
        return inItem
      })
    }

    updateCart({
      ...myCarts,
      cart: newItems,
    })
  }

  return (
    <>
      {myCarts.cart.map((item, _) => (
        <div className="cart-container" key={item.name}>
          <div className="flex gap-15 mt-10">
            <Checkbox
              id={item.name}
              isChecked={item.isChecked || false}
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
                  onClick={() => item.quantity < 20 && updateItemQuantity(item, Calc.plus)}
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="number-input-button"
                  onClick={() => item.quantity > 1 && updateItemQuantity(item, Calc.minus)}
                >
                  ▼
                </button>
              </div>
            </div>
            <span className="cart-price">{item.price.toLocaleString('ko-KR')}원</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItemRow
