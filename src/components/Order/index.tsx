import { useContext } from 'react'
import { CartContext } from '../../context/cartsContext'
import { checkedItemCount, sumPrice } from '../../util/calculator'
import { fomattingComma } from '../../util/formatter'

const Order = () => {
  const orderContext = useContext(CartContext)
  const checkedItems = checkedItemCount({ item: orderContext.order })
  if (!checkedItems) return null
  return (
    <section className="order-section">
      <header className="flex-col-center mt-20">
        <h2 className="order-section__title">주문/결제</h2>
        <hr className="divide-line mt-20" />
      </header>

      <div className="flex">
        <section className="order-left-section">
          <h3 className="order-title">주문 상품{`(${orderContext.order.length})개`}</h3>
          <hr className="divide-line-gray mt-10" />
          {orderContext.order.map((item) => (
            <div className="order-container" key={item.id}>
              <div className="flex gap-15 mt-10">
                <img className="w-144 h-144" src={item.imageUrl} alt={item.name} />
                <div className="flex-col gap-15">
                  <span className="order-name">{item.name}</span>
                  <span>수량: {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}

          <hr className="divide-line-thin mt-10" />
        </section>
        <section className="order-right-section">
          <div className="order-right-section__top">
            <h3 className="order-title">결제금액</h3>
          </div>
          <hr className="divide-line-thin" />
          <div className="order-right-section__bottom">
            <div className="flex justify-between p-20 mt-20">
              <span className="highlight-text">총 결제금액</span>
              <span className="highlight-text">{fomattingComma(sumPrice({ item: checkedItems }))}원</span>
            </div>
            <div className="flex-center mt-30 mx-10">
              <button className="primary-button flex-center">
                {fomattingComma(sumPrice({ item: checkedItems }))}원 결제하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Order
