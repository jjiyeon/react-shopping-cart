import { useContext } from 'react'
import { CartsContext } from '../../context/cartsContext'

const Payment = () => {
  const myCarts = useContext(CartsContext)

  const itemAmount = myCarts.cart.filter((item) => item.isChecked)
  const estimatedPrice = itemAmount.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)

  return (
    <section className="cart-right-section">
      <div className="cart-right-section__top">
        <h3 className="cart-title">결제예상금액</h3>
      </div>
      <hr className="divide-line-thin" />
      <div className="cart-right-section__bottom">
        <div className="flex justify-between p-20 mt-20">
          <span className="highlight-text">결제예상금액</span>
          <span className="highlight-text">{estimatedPrice.toLocaleString('ko-KR')}원</span>
        </div>
        <div className="flex-center mt-30 mx-10">
          <button
            className="primary-button flex-center"
            disabled={itemAmount.length === 0}
            onClick={() => console.log('주문 클릭')}
          >
            주문하기{`(${itemAmount.length})`}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Payment
