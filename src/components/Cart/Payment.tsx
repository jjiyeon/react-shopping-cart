import { useContext } from 'react'
import { CartContext, UpdateCartContext } from '../../context/cartsContext'
import { useNavigate } from '@tanstack/react-router'
import { fomattingComma } from '../../util/formatter'

const Payment = () => {
  const myCart = useContext(CartContext)
  const updateCart = useContext(UpdateCartContext)

  const itemAmount = myCart.cart.filter((item) => item.isChecked)
  const estimatedPrice = itemAmount.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
  const navigate = useNavigate()

  const handleOrderClick = () => {
    if (window.confirm('주문목록으로 이동할게요!')) {
      navigate({ to: '/order' })
      //장바구니에서 체크된 상품들이 삭제된다
      updateCart({
        ...myCart,
        order: myCart.cart.filter((item) => item.isChecked),
        cart: myCart.cart.filter((item) => !item.isChecked),
      })
    }
  }

  return (
    <section className="cart-right-section">
      <div className="cart-right-section__top">
        <h3 className="cart-title">결제예상금액</h3>
      </div>
      <hr className="divide-line-thin" />
      <div className="cart-right-section__bottom">
        <div className="flex justify-between p-20 mt-20">
          <span className="highlight-text">결제예상금액</span>
          <span className="highlight-text">{fomattingComma(estimatedPrice)}원</span>
        </div>
        <div className="flex-center mt-30 mx-10">
          <button className="primary-button flex-center" disabled={itemAmount.length === 0} onClick={handleOrderClick}>
            주문하기{`(${itemAmount.length})`}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Payment
