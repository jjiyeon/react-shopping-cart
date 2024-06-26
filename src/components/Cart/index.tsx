import { useContext, useEffect, useState } from 'react'
import { CartContext, UpdateCartContext } from '../../context/cartsContext'
import Checkbox from '../common/Checkbox'
import Payment from './Payment'
import CartItemRow from './CartItemRow'

const Cart = () => {
  const myContext = useContext(CartContext)
  const updateCart = useContext(UpdateCartContext)
  const [allCheckbox, setAllCheckbox] = useState(false)

  const handleChangeAll = () => {
    setAllCheckbox((state) => !state)
  }

  const handleAllDelete = () => {
    if (window.confirm('모든 상품을 삭제하시겠어요?')) {
      updateCart({ ...myContext, cart: [] })
    }
  }
  useEffect(() => {
    updateCart({
      ...myContext,
      cart: myContext.cart.map((item) => ({ ...item, isChecked: allCheckbox })),
    })
  }, [allCheckbox])

  return (
    <article className="cart_container">
      <h2 className="menu_name">장바구니</h2>
      <section className="col_box">
        <div className="row">
          <section className="cart-left-section">
            <div className="flex justify-between items-center">
              <div className="checkbox-container">
                <Checkbox id="allCheckBox" isChecked={allCheckbox} onChange={handleChangeAll} />
                <label className="checkbox-label" htmlFor="checkbox">
                  선택해제
                </label>
              </div>
              <button className="delete-button" onClick={handleAllDelete}>
                상품삭제
              </button>
            </div>
            <h3 className="cart-title">든든배송 상품{` (${myContext.cart.length})`}개</h3>
            <hr className="divide-line-gray mt-10" />
            <CartItemRow />
          </section>
          <Payment />
        </div>
      </section>
    </article>
  )
}

export default Cart
